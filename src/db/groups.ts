import { createServerClient } from '@supabase/auth-helpers-remix'

// READ

export async function getUserGroups(
  id: User['id'] | undefined,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  if (!id) throw new Error('No user id provided')

  const { data, error } = await serverSupabase
    .from('groups')
    .select('id,name,avatar')

  if (error) throw error

  return { data, headers: response.headers }
}

export async function getGroup(
  id: Group['id'] | undefined,
  request: Request
): Promise<{
  group: Omit<Group, 'user_id' | 'created_at'>
  headers: Headers
}> {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  if (!id) throw new Error('No group id provided')

  const { data, error } = await serverSupabase
    .from('groups')
    .select('id,name,avatar')
    .eq('id', id)
    .single()

  if (error) throw error

  return { group: data, headers: response.headers }
}

// CREATE

export async function createGroup(
  payload: GroupProfileForm,
  request: Request
): Promise<{ data: Group; headers: Headers }> {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { data, error } = await serverSupabase
    .from('groups')
    .insert([payload])
    .select()

  if (error) throw error

  return { data: data[0], headers: response.headers }
}

export async function createGroupAvatar(
  payload: GroupAvatarPayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
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

// UPDATE

export async function updateGroup(
  payload: GroupProfilePayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { id, ...profileForm } = payload

  const { data, error } = await serverSupabase
    .from('groups')
    .update({ ...profileForm })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return { data, headers: response.headers }
}

export async function updateGroupAvatar(
  payload: GroupAvatarPayload,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
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

// DELETE

export async function deleteGroup(id: string, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { error } = await serverSupabase.from('groups').delete().eq('id', id)

  if (error) throw error

  return { headers: response.headers }
}

export async function deleteGroupAvatar(payload: string, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient<DB>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { data, error } = await serverSupabase.storage
    .from('avatars')
    .remove([payload])

  if (error) throw error

  return { data, headers: response.headers }
}

// types

export interface GroupProfileForm {
  avatar: Group['avatar']
  name: Group['name']
  user_id: Group['user_id']
}

export interface GroupProfilePayload {
  avatar: Group['avatar']
  name?: Group['name']
  id: Group['id']
}

export interface GroupAvatarPayload {
  avatar: File
  name: GroupProfileForm['name']
  user_id: GroupProfileForm['user_id']
}
