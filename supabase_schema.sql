-- SQL Schema for Stratix Intelligence — Mission Critical B2B (V45.0)
-- Run this in your Supabase SQL Editor

-- 1. EXTENSIONS (Neural Vector Capabilities)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. CORE: AI Agents (Bots)
CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  system_prompt TEXT,
  model TEXT DEFAULT 'gpt-4o-mini',
  temperature FLOAT DEFAULT 0.7,
  whatsapp_phone_number_id TEXT, -- V30 Sync: For WhatsApp Cloud API
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RAG: Knowledge Vector Store (V42.0 Architecture)
CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- Optimized for Gemini/OpenAI
  metadata JSONB DEFAULT '{}', -- V42: Stores source, source_type, index
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);

-- 4. CRM: Leads & Analytics (Opal Engine)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  company TEXT,
  session_id TEXT, -- Link to Chat Session
  intent TEXT DEFAULT 'Prospecting',
  score TEXT DEFAULT 'Cold', -- Opal Logic: Cold, Warm, Hot
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CHANNELS: Conversations & History
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  session_id TEXT UNIQUE, -- Unique across sessions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PROFILES: Subscription & Consumption (V44.0 Master Sync)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free', -- 'free', 'pro', 'elite'
  subscription_status TEXT DEFAULT 'inactive',
  mp_customer_id TEXT,
  messages_sent_this_month INTEGER DEFAULT 0,
  fcm_token TEXT, -- V41 Sync: For Firebase Pulse Notifications
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. RPC & FUNCTIONS (Neural Logic Handlers)
CREATE OR REPLACE FUNCTION match_document_chunks (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT,
  p_bot_id UUID
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM document_chunks dc
  WHERE dc.bot_id = p_bot_id
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
