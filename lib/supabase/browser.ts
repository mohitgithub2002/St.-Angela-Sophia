"use client";
import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

// Used by the admin upload fields to send files straight to Supabase Storage.
export const createBrowserSupabase = () => createBrowserClient(supabaseUrl, supabaseAnonKey);
