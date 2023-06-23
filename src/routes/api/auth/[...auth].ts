import { type APIEvent, redirect } from 'solid-start'
import { createServerClient } from '@supabase/auth-helpers-remix'

export async function GET(event: APIEvent) {
  const response = new Response()
  const url = new URL(event.request.url)
  const code = url.searchParams.get('code')

  // TODO: {"name":"AuthApiError","message":"invalid request: both auth code
  // and code verifier should be non-empty","status":400}

  if (code) {
    const supabaseServer = createServerClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY,
      { request: event.request, response }
    )
    await supabaseServer.auth.exchangeCodeForSession(code)
  }

  return redirect('/app', {
    headers: response.headers,
  })
}
