import { createClient } from '@supabase/supabase-js'
import { storage } from '~/db/session.ts'

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co`,
  import.meta.env.VITE_SUPABASE_KEY as string,
  {
    auth: {
      flowType: 'pkce',

      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,

      storageKey: 'VDnD_session',

      storage: {
        getItem: async (key: string) => {
          const session = await storage.getSession()
          return session.get(key)
        },
        setItem: async (key: string, value: string) => {
          const session = await storage.getSession()
          session.set(key, value)
        },
        removeItem: async (key: string) => {
          const session = await storage.getSession()
          const value = session.get(key)
          await storage.destroySession(value)
        },
      },
    },
  }
)
