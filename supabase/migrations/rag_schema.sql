-- STRATIX INTELLIGENCE — RAG ENGINE (V5.1)
-- Activación de búsqueda vectorial y memoria profunda.

-- 1. Activación de la Extensión Vectorial (pgvector)
create extension if not exists vector;

-- 2. Tabla para fragmentos de documentos (Chunks)
create table if not exists document_chunks (
  id uuid primary key default uuid_generate_v4(),
  bot_id uuid references bots(id) on delete cascade,
  content text not null,
  embedding vector(768), -- Vector de 768 dimensiones (text-embedding-004)
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- 3. Índice para búsqueda de alta velocidad (Coseno)
create index on document_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 4. RPC: Motor de Búsqueda Semántica
-- Esta función recupera los fragmentos más relevantes para una consulta.
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
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) as similarity
  from document_chunks dc
  where dc.bot_id = p_bot_id
    and 1 - (dc.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;

-- 5. Seguridad de RAG (RLS)
alter table document_chunks enable row level security;

create policy "Users can manage their own bot's chunks"
  on document_chunks for all
  using (
    exists (
      select 1 from bots
      where bots.id = document_chunks.bot_id
      and bots.user_id = auth.uid()
    )
  );

create policy "Public can read chunks for chat processing"
  on document_chunks for select
  using (true);
