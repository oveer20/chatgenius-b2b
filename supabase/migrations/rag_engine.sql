-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create a table for document chunks
create table if not exists document_chunks (
  id uuid primary key default uuid_generate_v4(),
  bot_id uuid references bots(id) on delete cascade,
  content text not null,
  embedding vector(768), -- Optimized for Gemini text-embedding-004 (768 dimensions)
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- High-Performance HNSW Index for Neural RAG (V27.0)
create index on document_chunks using hnsw (embedding vector_cosine_ops)
with (m = 16, ef_construction = 64);

-- Optimized Function to match chunks based on cosine similarity and Recency (V40.0)
create or replace function match_document_chunks (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  p_bot_id uuid,
  p_source_type text default null
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float,
  recency_score float
)
language plpgsql
as $$
begin
  return query
  select
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity,
    -- Recency Score: Fragmentos más nuevos tienen un ligero impulso (0.0 a 0.2)
    case 
      when extract(epoch from (now() - document_chunks.created_at)) < 86400 then 0.2 -- Último día
      when extract(epoch from (now() - document_chunks.created_at)) < 604800 then 0.1 -- Última semana
      else 0
    end as recency_score
  from document_chunks
  where (1 - (document_chunks.embedding <=> query_embedding)) > match_threshold
    and document_chunks.bot_id = p_bot_id
    and (p_source_type is null or document_chunks.metadata->>'source_type' = p_source_type)
  -- Re-ranking: Similitud + Bono de Recencia
  order by (1 - (document_chunks.embedding <=> query_embedding)) + 
           (case 
              when extract(epoch from (now() - document_chunks.created_at)) < 86400 then 0.2
              when extract(epoch from (now() - document_chunks.created_at)) < 604800 then 0.1
              else 0
            end) desc
  limit match_count;
end;
$$;
