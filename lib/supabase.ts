import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbEvent {
  id: string;
  title: string;
  description: string;
  audience: string;
  dates_label: string;
  time_label: string;
  location: string;
  facilitator_name: string | null;
  facilitator_role: string | null;
  price: number;
  currency: string;
  slots_total: number | null;
  slots_remaining: number | null;
  is_active: boolean;
  created_at: string;
}