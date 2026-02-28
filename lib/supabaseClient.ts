import { createClient } from '@supabase/supabase-js'

// Fallback placeholders so the app runs without crashing when env vars are missing.
// Add real values to .env.local before connecting to the database.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
