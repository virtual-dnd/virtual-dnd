import { createBrowserClient } from '@supabase/auth-helpers-remix'

export const supabase = createBrowserClient<DB>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)
