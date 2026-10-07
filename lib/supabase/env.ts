export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Without these the public site shows the default content in lib/data.ts and the admin panel explains how to connect.
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);
