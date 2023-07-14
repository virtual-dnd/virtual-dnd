import { createServerClient } from '@supabase/auth-helpers-remix'

// READ

export async function getGroupPlayers(
  group_id: Group['id'] | undefined,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
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

export async function getUserPlayers(
  user_id: User['id'] | undefined,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  if (!user_id) throw new Error('Unable to get player without user_id')

  const { data, error } = await serverSupabase
    .from('players')
    .select('*')
    .eq('user_id', user_id)

  if (error) throw error

  return { players: data, headers: response.headers }
}

// CREATE

export async function createPlayer(
  payload: CreatePlayerPayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
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

// UPDATE

export async function updatePlayer(payload: Partial<Player>, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )
  const { id, ...playerForm } = payload

  if (!id) throw new Error('Unable to update player without id')

  const { data, error } = await serverSupabase
    .from('players')
    .update(playerForm)
    .eq('id', id)
    .select()

  if (error) throw error

  return { player: data, headers: response.headers }
}

// types

export interface CreatePlayerPayload {
  admin: boolean
  group_id: Group['id']
  user_id: User['id']
}
