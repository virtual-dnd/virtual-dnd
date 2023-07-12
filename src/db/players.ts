import { createServerClient } from '@supabase/auth-helpers-remix'
import { type Group } from './groups.ts'
import { type UserProfile } from './profiles.ts'

// READ

export async function getGroupPlayers(
  group_id: Group['id'] | undefined,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  if (!group_id) throw new Error('Unable to get group players without group_id')

  const { data, error } = await serverSupabase
    .from('players')
    .select('user_id,avatar,nickname')
    .eq('group_id', group_id)

  if (error) throw error

  return { players: data, headers: response.headers }
}

// CREATE

export async function createPlayer(
  payload: CreatePlayerPayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { data, error } = await serverSupabase
    .from('players')
    .insert([payload])
    .select()

  if (error) throw error

  return { player: data, headers: response.headers }
}

// types

export interface Player {
  admin: boolean | null
  avatar: UserProfile['avatar']
  group_id: Group['id']
  id: string
  online: boolean | null
  user_id: UserProfile['id']
}

export interface CreatePlayerPayload {
  admin: boolean
  group_id: Group['id']
  user_id: UserProfile['id']
}
