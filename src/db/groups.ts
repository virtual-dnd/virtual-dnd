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
