-- Tabla para capturar leads (prospectos) de los bots
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  bot_id uuid references bots(id) on delete cascade,
  session_id text, -- Identificador único de sesión del widget
  name text not null,
  email text,
  phone text,
  status text default 'Nuevo', -- Nuevo, Contactado, Cerrado, etc.
  intent text, -- Ventas, Soporte, Info, etc. (Opal Logic)
  score text, -- Cold, Warm, Hot (Opal Logic)
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

create index on leads (bot_id);
create index on leads (session_id);

-- Función para contar leads por bot (opcional para analíticas)
create or replace function get_bot_stats(p_bot_id uuid)
returns json
language plpgsql
as $$
declare
  total_leads int;
  last_lead_at timestamptz;
begin
  select count(*) into total_leads from leads where bot_id = p_bot_id;
  select max(created_at) into last_lead_at from leads where bot_id = p_bot_id;
  
  return json_build_object(
    'total_leads', total_leads,
    'last_lead_at', last_lead_at
  );
end;
$$;
