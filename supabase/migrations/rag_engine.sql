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

-- Index for semantic search performance
create index on document_chunks using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Function to match chunks based on cosine similarity
create or replace function match_document_chunks (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  p_bot_id uuid
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
    and document_chunks.bot_id = p_bot_id
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;
