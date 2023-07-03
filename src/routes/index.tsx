import { A, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { Show } from 'solid-js'
import { getUserSession } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, event) => {
    const response = await getUserSession(event.request)
    return response.data
  })
}

export default function Home() {
  const session = useRouteData<typeof routeData>()

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
              <A class="action-inverse-rounded-btn action-link" href="./signin">
                Sign in
              </A>
            }
          >
            <A class="action-inverse-rounded-btn action-link" href="./app">
              Open app
            </A>
          </Show>
        </header>

        <main class="px-4 py-12">
          <h1 class="font-display text-6xl text-text-inverse">HOME</h1>
          <p class="text-text-inverse">
            This will have some cool marketing stuff later...
          </p>
        </main>
      </div>

      <section class="bg-white px-4 py-12 text-text-300">
        <h2 class="font-display text-2xl text-text-200">
          Another cool saying...
        </h2>
        <p>More wow factor...</p>
      </section>

      <section class="bg-surface-200 px-4 py-12">
        <h2 class="font-display text-2xl text-text-300">Demo thing...</h2>
        <code class="block py-4 text-text-100">
          Here is a code snippet just in case you need it...
        </code>
      </section>

      <footer class="bg-surface-inverse px-4 py-12">
        <small class="text-text-inverse">Please fund me footer...</small>
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
