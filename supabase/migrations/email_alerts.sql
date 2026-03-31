-- SQL Migration: Email Notifications for Leads
-- Run this in Supabase SQL Editor

ALTER TABLE bots
ADD COLUMN IF NOT EXISTS email_alerts_to TEXT;

COMMENT ON COLUMN bots.email_alerts_to IS 'Email address specifically for real-time lead notifications (Hot Leads)';
