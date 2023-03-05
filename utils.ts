import type { Session } from "@supabase/supabase-js"

import { supabase } from "~core/store"

export function generateRandomString(length = 7) {
  return (Math.random() + 1).toString(36).substring(length)
}

export async function handleSession(callbackFn: (session: Session) => void) {
  const { data, error } = await supabase.auth.getSession()
  if (error || !data) return
  callbackFn(data.session)
}
