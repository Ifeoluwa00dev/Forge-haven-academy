import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. Uses the service_role key, which bypasses Row Level
// Security entirely. Never import this file in a "use client" component,
// never expose this key with a NEXT_PUBLIC_ prefix.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — admin features will not work."
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceRoleKey || "placeholder-service-role-key"
);