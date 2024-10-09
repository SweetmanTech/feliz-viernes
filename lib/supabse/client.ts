import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServerKey = process.env.SUPABASE_SERVER_KEY;

if (!(supabaseUrl && supabaseServerKey)) {
  throw new Error("Supabase ENV variables not set");
}

const supabaseClient = createClient(supabaseUrl, supabaseServerKey);

export default supabaseClient;
