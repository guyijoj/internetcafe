create table users (
  id uuid primary key default gen_random_uuid(),
  user_name text,
  user_phone text,
  user_email text unique,
  created_at timestamp with time zone default now()
);