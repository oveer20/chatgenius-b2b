-- Stratix Intelligence Migration v1
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/kgbraenqnhqbbqjxfdif/sql/new)

-- 1. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event ON analytics_events(event);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarded_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_bots_created INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_leads_captured INTEGER DEFAULT 0;

-- 3. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, onboarded_at, last_active_at, total_bots_created, total_leads_captured)
  VALUES (NEW.id, NEW.email, NOW(), NOW(), 0, 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
