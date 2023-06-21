import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co`,
  import.meta.env.VITE_SUPABASE_KEY as string,
  {
    auth: {
      flowType: 'pkce',
      // storage: TODO: add custom cookie storage here
    },
  }
)
