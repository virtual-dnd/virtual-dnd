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

export async function updateUserProfile(formData: FormData, request: Request) {
  const response = new Response()
  const serverSupabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    { request, response }
  )

  const {
    data: { session },
    error,
  } = await serverSupabase.auth.getSession()

  if (error) throw error

  return { session, headers: response.headers }
}

// types

export interface User {
  id: string
  name: string
  email: string
  pronouns: string
  avatar: string
}
