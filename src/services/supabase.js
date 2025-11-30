import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://utjttkibkkfwyepsfyie.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0anR0a2lia2tmd3llcHNmeWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2ODQwMjAsImV4cCI6MjA1NjI2MDAyMH0.jvps5DRSaQYq_ezS2ly-wx0NeHcwEhQD_GYMRQrqw84";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
