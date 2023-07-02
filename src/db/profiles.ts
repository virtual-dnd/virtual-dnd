import { createServerClient } from '@supabase/auth-helpers-remix'

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
  payload: { avatar: File | null },
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )
  const { avatar } = payload

  if (avatar?.name) {
    const { data, error } = await serverSupabase.storage
      .from('avatars')
      .upload(`users/${avatar?.name}`, avatar, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    return { data, headers: response.headers }
  }

  return { data: null, headers: response.headers }
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
  const { id, avatar, ...profileForm } = payload

  const { data: avatarData } = await updateUserAvatar({ avatar }, request)

  const { data, error } = await serverSupabase
    .from('profiles')
    .update({
      ...profileForm,
      avatar: avatarData?.path ?? null,
    })
    .eq('id', id)
    .select()

  if (error) throw error

  return { data, headers: response.headers }
}

// types

export interface UserProfileForm extends Omit<UserProfile, 'avatar'> {
  avatar: File | null
}

export interface UserProfile {
  avatar: string
  display_name: string
  email?: string
  id: string
  user_name: string
  pronouns: string
}
