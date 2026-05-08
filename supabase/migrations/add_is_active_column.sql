-- Migration: Add is_active column to bots table
-- Run this in Supabase Dashboard > SQL Editor
-- Project: kgbraenqnhqbbqjxfdif

ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Backfill existing bots to active
UPDATE public.bots SET is_active = true WHERE is_active IS NULL;

-- Add index for faster status queries
CREATE INDEX IF NOT EXISTS idx_bots_is_active ON public.bots(is_active);