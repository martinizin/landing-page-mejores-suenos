import { createClient } from '@supabase/supabase-js';

// Read from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase env vars missing: PUBLIC_SUPABASE_URL and/or PUBLIC_SUPABASE_ANON_KEY must be set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);