import { type User as SBUser } from '@supabase/supabase-js'
import type { Database } from './lib/database.types'

declare global {
  export type DB = Database
  export type User = SBUser
  export type Group = Database['public']['Tables']['groups']['Row']
  export type Player = Database['public']['Tables']['players']['Row']
  export type Profile = Database['public']['Tables']['profiles']['Row']
}
