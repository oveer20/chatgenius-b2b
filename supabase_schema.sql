-- SQL Schema for Arsenex AI B2B
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
  whatsapp_phone_number TEXT, -- For mapping WhatsApp messages
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for conversations (optional tracking)
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  external_user_id TEXT, -- ID from the website where embedded
  session_id TEXT, -- To link with transient widget sessions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Leads (Prospects)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  session_id TEXT, -- To link lead with their chat session
  intent TEXT DEFAULT 'Information',
  score TEXT DEFAULT 'Cold',
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

-- Table for User Profiles (Subscription Management)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free', -- 'free', 'growth', 'enterprise'
  subscription_status TEXT DEFAULT 'inactive', -- 'active', 'inactive', 'canceled'
  mp_customer_id TEXT, -- Mercado Pago Customer ID (optional)
  messages_sent_this_month INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update their own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment message count safely
CREATE OR REPLACE FUNCTION public.increment_message_count(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET messages_sent_this_month = messages_sent_this_month + 1,
      updated_at = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
