import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Create a singleton Supabase client using public env vars (anon key).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	// Keep failure obvious during development
	console.warn("Supabase URL or anon key not set in environment variables");
}

export const supabase: SupabaseClient = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export async function getNoteTitles(): Promise<string[]> {
	const { data, error } = await supabase.from("notes").select<string, { title: string }>("title");
	if (error) throw new Error(`Supabase query error: ${error.message}`);
	return (data ?? []).map((r) => r.title ?? "");
}

