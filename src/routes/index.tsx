import { A, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { Show } from 'solid-js'
import { type Session } from '@supabase/supabase-js'
import { getUserSession } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, event) => {
    const sessionJSON = await getUserSession(event.request)
    const session = await sessionJSON.json()
    return session
  })
}

export default function Home() {
  const session = useRouteData<Session>()

  return (
    <div class="h-full min-h-screen">
      <div class="bg-background pb-2">
        <header class="align-center flex justify-between p-4">
          <h1 class="self-center">
            <A class="text-text-inverse" href="/">
              :crossed_swords: Virtual DnD
            </A>
          </h1>

          <Show
            when={session()?.user}
            fallback={
              <A
                class="action-link action-inverse-btn marketing"
                href="./signin"
              >
                Sign in
              </A>
            }
          >
            <A class="action-inverse-btn action-link marketing" href="./app">
              Go to app
            </A>
          </Show>
        </header>

        <main class="px-4 py-12">
          <h1 class="font-display text-6xl text-action-text">HOME</h1>
          <p class="text-action-text">
            This will have some cool marketing stuff later...
          </p>
        </main>
      </div>

      <section class="bg-white px-4 py-12">
        <h2 class="font-display text-2xl">Another cool saying...</h2>
        <p>More wow factor...</p>
      </section>

      <section class="bg-surface-200 px-4 py-12">
        <h2 class="font-display text-2xl">Demo thing...</h2>
        <code class="block py-4">
          Here is a code snippet just in case you need it...
        </code>
      </section>

      <footer class="bg-surface-inverse px-4 py-12">
        <small class="text-text-100">Please fund me footer...</small>
        <ul>
          <li>
            <A class="action-link" href="./signin">
              Sign in
            </A>
          </li>
        </ul>
      </footer>
    </div>
  )
}
