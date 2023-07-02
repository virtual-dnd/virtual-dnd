import { createServerClient } from '@supabase/auth-helpers-remix'

// READ

export async function getUserProfile(request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { data, error } = await serverSupabase.from('profiles').select('*')

  if (error) throw error

  return { data: data[0], headers: response.headers }
}

// UPDATE

export async function updateUserAvatar(
  payload: { avatar: File; id: UserProfileForm['id'] },
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
    .upload(`${payload.id}/${avatar?.name}`, avatar, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  return { data, headers: response.headers }
}

export async function updateUserProfile(
  payload: UserProfileForm,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )
  const { id, ...profileForm } = payload

  const { data, error } = await serverSupabase
    .from('profiles')
    .update({
      ...profileForm,
    })
    .eq('id', id)
    .select()

  if (error) throw error

  return { data, headers: response.headers }
}

// DELETE

export async function deleteUserAvatar(
  payload: { path: UserProfile['avatar'] },
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { data, error } = await serverSupabase.storage
    .from('avatars')
    .remove([payload.path])

  if (error) throw error

  return { data, headers: response.headers }
}

// TYPES

export interface UserProfile {
  avatar: string
  display_name: string
  email?: string
  id: string
  user_name: string
  pronouns: string
}

// types

export type UserProfileForm = Omit<UserProfile, 'email' | 'user_name'>
