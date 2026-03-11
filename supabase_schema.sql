-- SQL Schema for ChatGenius B2B
-- Run this in your Supabase SQL Editor

-- Table for AI Agents (Bots)
CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  system_prompt TEXT,
  model TEXT DEFAULT 'gpt-4o-mini',
  temperature FLOAT DEFAULT 0.7,
  knowledge_base TEXT, -- Raw text for context injection (MVP RAG)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for conversations (optional tracking)
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  external_user_id TEXT, -- ID from the website where embedded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for messages (for analytics and history)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bots"
  ON bots FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view public bot info (for widget)"
  ON bots FOR SELECT
  USING (true);
