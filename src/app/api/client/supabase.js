import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// console.info({ env: process.env });

const supabase = createClient(supabaseUrl, supabaseKey);

// return supabase;
export { supabase };
