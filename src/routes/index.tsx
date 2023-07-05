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
      <div class="bg-[#5764f2] pb-2">
        <header class="align-center flex justify-between p-4">
          <h1 class="self-center">
            <A class="text-neutral-text-inverse" href="/">
              :crossed_swords: Virtual DnD
            </A>
          </h1>

          <Show
            when={session()?.user}
            fallback={
              <A
                class="rounded-full bg-action-bg-100-inverse px-6 py-2 hover:shadow-lg"
                href="./signin"
              >
                Sign in
              </A>
            }
          >
            <A
              class="rounded-full bg-action-bg-100-inverse px-6 py-2 hover:shadow-lg"
              href="./app"
            >
              Open app
            </A>
          </Show>
        </header>

        <main class="min-h-[66vh] px-4 py-12 sm:min-h-[33vh]">
          <h1 class="font-display text-6xl text-neutral-text-inverse">HOME</h1>
          <p class="text-neutral-text-inverse">
            This will have some cool marketing stuff later...
          </p>
        </main>
      </div>

      <section class="min-h-[33vh] bg-white px-4 py-12">
        <h2 class="font-display text-2xl text-neutral-text-400">
          Another cool saying...
        </h2>
        <p>More wow factor...</p>
      </section>

      <section class="bg-neutral-surface-200 px-4 py-12">
        <h2 class="font-display text-2xl text-neutral-text-400">
          Demo thing...
        </h2>
        <code class="block py-4 text-neutral-text-100">
          Here is a code snippet just in case you need it...
        </code>
      </section>

      <footer class="min-h-[33vh] bg-neutral-surface-inverse px-4 py-12">
        <small class="text-neutral-text-inverse">
          Please fund me footer...
        </small>
        <ul>
          <li>
            <A class="hover:text-action-text-100" href="./signin">
              Sign in
            </A>
          </li>
        </ul>
      </footer>
    </div>
  )
}
