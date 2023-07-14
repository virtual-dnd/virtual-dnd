import { createServerClient } from '@supabase/auth-helpers-remix'
import { supabase } from '~/lib/solidbaseClient.ts'

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

// CREATE

export async function createUserProfile(
  payload: UserProfileForm,
  request: Request
) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const { error } = await serverSupabase
    .from('profiles')
    .insert([payload])
    .select()

  if (error) throw error

  return { headers: response.headers }
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

export async function removeUserAvatar(payload: string, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient(
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

// SUBSCRIPTIONS

export async function subscribeToProfileOnlineStatus(
  group_id: Group['id'] | undefined
) {
  if (!group_id) return

  return supabase
    .channel('vdd:public:profiles')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `group_id=eq.${group_id}`,
      },
      () => ({
        event: 'UPDATE',
        group_id,
      })
    )
    .subscribe()
}

// TYPES

export interface UserProfileForm {
  avatar?: string | null
  display_name?: string | null
  id: string
  profile_banner?: string | null
  pronouns?: string | null
}
