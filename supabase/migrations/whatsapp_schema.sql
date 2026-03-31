-- MIGRATION: WhatsApp Business API Support
-- Añade soporte multi-inquilino para que cada bot pueda tener su propio número de WhatsApp

ALTER TABLE bots
ADD COLUMN IF NOT EXISTS whatsapp_phone_number_id TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_token TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_verify_token TEXT;

-- Opcional: Crear un índice si llegamos a hacer búsquedas por verify_token en el Webhook
CREATE INDEX IF NOT EXISTS idx_bots_whatsapp_verify ON bots (whatsapp_verify_token);
