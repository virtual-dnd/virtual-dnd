import { createServerClient } from '@supabase/auth-helpers-remix'

// READ

export async function getUserGroups(id: string | undefined, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  if (!id) throw new Error('No user id provided')

  const { data, error } = await serverSupabase
    .from('groups')
    .select('id,name,avatar')
    .eq('user_id', id)

  if (error) throw error

  return { data, headers: response.headers }
}

// CREATE

export async function createGroup(payload: GroupProfileForm, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { error } = await serverSupabase.from('groups').insert([payload])

  if (error) throw error

  return { headers: response.headers }
}

export async function createGroupAvatar(
  payload: GroupAvatarPayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )
  const { avatar } = payload

  const { data, error } = await serverSupabase.storage
    .from('avatars')
    .upload(
      `${payload.user_id}/group-${payload.name}/avatar-${avatar?.name}`,
      avatar,
      {
        cacheControl: '3600',
        upsert: false,
      }
    )

  if (error) throw error

  return { data, headers: response.headers }
}

// types

export interface GroupProfileForm {
  avatar: string
  name: string
  user_id: string
}

export interface GroupAvatarPayload {
  avatar: File
  name: GroupProfileForm['name']
  user_id: string
}
