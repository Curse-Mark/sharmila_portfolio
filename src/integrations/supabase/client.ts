
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables if available, otherwise fallback to hardcoded values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://rtlnqcwwphlinrezydul.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bG5xY3d3cGhsaW5yZXp5ZHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NjY1MjAsImV4cCI6MjA1NDM0MjUyMH0.jLTXvJZbZBWv1KmaiRVGmG047y1qRlD10MaavqOwzhI";

// For development debugging - log once on load
console.log('Connecting to Supabase URL:', SUPABASE_URL);

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add custom type for the about table since we can't modify the types.ts file
export type AboutRow = {
  id: number;
  description: string | null;
  photo_url: string | null;
  resume_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}
