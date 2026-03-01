import { createClient } from '@supabase/supabase-js';

// Use safe placeholders locally so code does not crash when env vars are missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Export one shared Supabase client instance for the whole app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
