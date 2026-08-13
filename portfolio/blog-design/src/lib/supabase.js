import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tdgmzwjevbyxzgqjqlir.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZ216d2pldmJ5eHpncWpxbGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNTcxMDQsImV4cCI6MjEwMTkzMzEwNH0.V2TdM_5RDyTwfq365tazGifMPPZ08LHxSBLIyJ4QhBs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'adminSession',
  },
});
