const supabase = require('@supabase/supabase-js');

const anonKey = process.env.SUPABASE_ANON_KEY;
// Create a single supabase client for interacting with your database
const supabaseClient = supabase.createClient('https://yjffafdqxsayxjlvadmk.supabase.co', anonKey);

export default supabaseClient;
