import { json, redirect } from 'solid-start/server'
import { Session, type Provider } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { supabase } from '~/lib/solidbaseClient.ts'

// Auth

const redirectTo = 'http://localhost:3000/api/auth/callback'

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

  return json(session, { headers: response.headers })
}

// export async function getUserId(request: Request) {
//   const session = await getUserSession(request)
//   const userId = session.get('userId')
//   if (!userId || typeof userId !== 'string') return null
//   return userId
// }

// export async function requireUserSession(
//   request: Request,
//   redirectTo: string = new URL(request.url).pathname
// ) {
//   const session = await getUserSession(request)
//   const userId = session.get('userId')

//   if (!userId || typeof userId !== 'string') {
//     const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
//     throw redirect(`/login?${searchParams}`)
//   }

//   return userId
// }

// export async function getUser(request: Request) {
//   const userId = await getUserId(request)
//   if (typeof userId !== 'string') {
//     return null
//   }

//   try {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser(userId)
//     return user
//   } catch {
//     throw signOut(request)
//   }
// }
