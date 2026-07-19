-- =============================================
-- STRATIX INTELLIGENCE - Supabase Schema
-- =============================================

-- Tabla de Agentes IA
CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  system_prompt TEXT,
  knowledge_base TEXT,
  model TEXT DEFAULT 'gemini',
  whatsapp_phone_number_id TEXT,
  whatsapp_token TEXT,
  instagram_id TEXT,
  email_alerts_to TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
  session_id TEXT,
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  phone TEXT,
  company TEXT,
  intent TEXT DEFAULT 'Information',
  score TEXT DEFAULT 'Cold',
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Chats
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  intent TEXT,
  score TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  fcm_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_bot_id ON leads(bot_id);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_chats_bot_id ON chats(bot_id);
CREATE INDEX IF NOT EXISTS idx_chats_session_id ON chats(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_bots_user_id ON bots(user_id);

-- RLS Policies (Seguridad)
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios ver solo sus datos
CREATE POLICY "Users can view own bots" ON bots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bots" ON bots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bots" ON bots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own bots" ON bots FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM bots WHERE bots.id = leads.bot_id AND bots.user_id = auth.uid())
);
CREATE POLICY "Users can insert own leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own leads" ON leads FOR UPDATE USING (
  EXISTS (SELECT 1 FROM bots WHERE bots.id = leads.bot_id AND bots.user_id = auth.uid())
);

CREATE POLICY "Users can view own chats" ON chats FOR SELECT USING (
  EXISTS (SELECT 1 FROM bots WHERE bots.id = chats.bot_id AND bots.user_id = auth.uid())
);
CREATE POLICY "Users can insert own chats" ON chats FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM chats WHERE chats.id = messages.chat_id AND EXISTS (SELECT 1 FROM bots WHERE bots.id = chats.bot_id AND bots.user_id = auth.uid()))
);
CREATE POLICY "Users can insert own messages" ON messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bots_updated_at BEFORE UPDATE ON bots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-crear perfil al registrar usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- Vector Search (RAG) - 1536 dimensiones (OpenAI)
-- =============================================
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_document_chunks_bot_id ON document_chunks(bot_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding ON document_chunks USING ivfflat (embedding vector_cosine_ops);

-- Función RPC para búsqueda semántica
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.5,
  match_count INT DEFAULT 5,
  p_bot_id UUID DEFAULT NULL
)
RETURNS TABLE(id UUID, content TEXT, metadata JSONB, similarity FLOAT)
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
  WHERE (p_bot_id IS NULL OR dc.bot_id = p_bot_id)
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;