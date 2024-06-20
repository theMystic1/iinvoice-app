import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zvonrwiajawyhaqvifcz.supabase.co";

// process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2b25yd2lhamF3eWhhcXZpZmN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDUyNzUwNywiZXhwIjoyMDMwMTAzNTA3fQ.ZRCq3zORA6FsqnY9ZP60vFb1RMH-Gzrl75kNT1enOtg";

// process.env.SUPABASE_URL;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
