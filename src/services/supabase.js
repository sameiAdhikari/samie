import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://egrcqhholauahimibjiy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncmNxaGhvbGF1YWhpbWliaml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NzcxNTksImV4cCI6MjA2MTA1MzE1OX0.MkOQD9syJGKuI621qm0pgQ_fk-ScAgU2BLjWBw-TOuw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
