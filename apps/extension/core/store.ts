import { createClient } from "@supabase/supabase-js"

// TODO it could be useful to extract this into a "logic" package
export const supabase = createClient(
  process.env.PLASMO_PUBLIC_SUPABASE_URL || "",
  process.env.PLASMO_PUBLIC_SUPABASE_KEY || ""
)
