import { redirect } from 'solid-start/server'
import { type Provider } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { supabase } from '~/lib/solidbaseClient.ts'

// Auth

const redirectTo = `${import.meta.env.VITE_HOST}/api/auth/callback}`

export async function signInWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  })

  if (error) throw error

  return data.user
}

export async function signInWithProvider(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  })

  if (error) throw error

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error

  return redirect('/')
}

// Session

export async function getUser(request: Request) {
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

  return { id: session?.user?.id, headers: response.headers }
}

export async function getUserSession(request: Request) {
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

  return { data: session, headers: response.headers }
}
