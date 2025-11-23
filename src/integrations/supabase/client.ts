
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aoksmuerekymiffliehi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFva3NtdWVyZWt5bWlmZmxpZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjEyNzAsImV4cCI6MjA2NzQzNzI3MH0.rSMAETjm_LHbGRTI8u2yFNPWbieMpMZ8dqqZg_o3tGs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
