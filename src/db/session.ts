import { redirect } from 'solid-start/server'
import { createCookieSessionStorage } from 'solid-start/session'
import { type Provider } from '@supabase/supabase-js'
// import { createServerClient } from '@supabase/auth-helpers-remix'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { supabase } from '~/lib/solidbaseClient.ts'

const sessionSecret = import.meta.env.VITE_SESSION_SECRET

export const storage = createCookieSessionStorage({
  cookie: {
    name: 'VDnD_session',
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: import.meta.env.PROD,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()

  session.set('userId', userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function getUserSession(request: Request) {
  // return storage.getSession(request.headers.get('Cookie'))

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

  return {
    session,
    headers: response.headers,
  }
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

export async function requireUserSession(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }

  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (typeof userId !== 'string') {
    return null
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser(userId)
    return user
  } catch {
    throw signOut(request)
  }
}

// helpers

// type SigninForm = {
//   email: string
// }

// export async function register({ username, password }: LoginForm) {
//   return db.user.create({
//     data: { username: username, password },
//   })
// }

// export async function login() {
//   const user = await db.user.findUnique({ where: { username } })
//   if (!user) return null
//   const isCorrectPassword = password === user.password
//   if (!isCorrectPassword) return null
//   return user
// }

export async function signInWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `http://localhost:3000/api/auth/callback`,
    },
  })

  if (error) throw error

  return data.user
}

export async function signInWithProvider(provider: Provider, request: Request) {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider })

  console.log('signInWithProvider', data)

  if (error) throw error

  return redirect(data.url, {
    headers: request.headers,
  })
}

export async function signOut(request: Request) {
  // const session = await storage.getSession(request.headers.get('Cookie'))
  const { error } = await supabase.auth.signOut()

  if (error) throw error

  return redirect('/', {
    headers: request.headers,
  })
}