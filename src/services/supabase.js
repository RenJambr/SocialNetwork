import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://utjttkibkkfwyepsfyie.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0anR0a2lia2tmd3llcHNmeWllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDY4NDAyMCwiZXhwIjoyMDU2MjYwMDIwfQ.IPtrPwII03Va2K8XRs43e_X_CjMmMCUjAg5laE3T1wU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
