import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

export default function () {
  return createClient<Database>(
    process.env.SUPABASE_URL || 'https://kdaxxqqtfbsueslerzul.supabase.co',
    process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkYXh4cXF0ZmJzdWVzbGVyenVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NjI0NTYsImV4cCI6MjAxNjIzODQ1Nn0.yyU5-OUsogCM3z1g9AHtrPJulQgQSaIrZ4sY50RH4Uw'
  );
}
