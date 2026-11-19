import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ookikzokhkvwujwrbfco.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_JxC73-68TWCTNi7vMazvRQ_16v-Kleh";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
