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
      <div class="pb-2">
        <header class="flex-justify-between flex p-4 text-center">
          <h1 class="self-center">
            <A class="text-neutral-text-inverse" href="/">
              :crossed_swords: Virtual DnD
            </A>
          </h1>

          <Show
            when={session()?.user}
            fallback={
              <A
                class="bg-action-bg-100-inverse rounded-full px-6 py-2 hover:shadow-lg"
                href="./signin"
              >
                Sign in
              </A>
            }
          >
            <A
              class="bg-action-bg-100-inverse rounded-full px-6 py-2 hover:shadow-lg"
              href="./app"
            >
              Open app
            </A>
          </Show>
        </header>

        <main class="min-h-66vh sm:min-h-33vh px-4 py-12">
          <h1 class="font-display text-neutral-text-inverse text-6xl">HOME</h1>
          <p class="text-neutral-text-inverse">
            This will have some cool marketing stuff later...
          </p>
        </main>
      </div>

      <section class="min-h-33vh bg-white px-4 py-12">
        <h2 class="font-display text-neutral-text-400 text-2xl">
          Another cool saying...
        </h2>
        <p>More wow factor...</p>
      </section>

      <section class="bg-neutral-surface-200 px-4 py-12">
        <h2 class="font-display text-neutral-text-400 text-2xl">
          Demo thing...
        </h2>
        <code class="text-neutral-text-100 block py-4">
          Here is a code snippet just in case you need it...
        </code>
      </section>

      <footer class="min-h-33vh bg-neutral-surface-inverse px-4 py-12">
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
