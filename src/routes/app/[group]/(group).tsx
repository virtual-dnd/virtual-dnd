import { A, type RouteDataArgs, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { getGroup } from '~/db/groups.ts'
import { getUser } from '~/db/session.ts'

export function routeData({ params }: RouteDataArgs<{ group: string }>) {
  return createServerData$(
    async (groupId, { request }) => {
      const { user } = await getUser(request)
      const { group } = await getGroup(groupId, request)
      return {
        user,
        group,
      }
    },
    { key: () => params.group }
  )
}

export default function Group() {
  const data = useRouteData<typeof routeData>()

  return (
    <>
      <div class="side-bar relative">
        <div class="bg-neutral-surface-300 flex items-center justify-between pe-4 ps-4 font-bold shadow-md">
          <p class="text-neutral-text-400">{data()?.group?.name}</p>
          <A
            aria-label="settings page"
            href={`/app/${data()?.group?.id}/settings`}
          >
            <div
              aria-hidden="true"
              class="i-octicon:gear-16 text-neutral-text-300 hover:(text-action-link) text-xl transition-colors duration-200 ease-in-out"
            />
          </A>
        </div>

        <nav class="mt-2 pe-1 ps-1 pt-4">
          <ul class="flex flex-col gap-1">
            <li>
              <A
                activeClass="text-action-link-hover decoration-action-link decoration-underline font-bold bg-neutral-surface-400"
                class="text-action-link underline-transparent hover:(underline-action-link text-action-link-hover bg-neutral-surface-400) block rounded-md p-2"
                href="/app"
              >
                Dashboard
              </A>
            </li>
            <li>
              <A
                activeClass="text-action-link-hover decoration-action-link decoration-underline font-bold bg-neutral-surface-400"
                class="text-action-link underline-transparent hover:(underline-action-link text-action-link-hover bg-neutral-surface-400) block rounded-md p-2"
                href="/app/encounters"
              >
                Encounters
              </A>
            </li>
          </ul>
        </nav>

        <div class="bg-neutral-surface-300 absolute bottom-0 left-0 left-0 right-0 flex h-1/2 w-full justify-between rounded-md p-2">
          Group members - show online/offline
        </div>
      </div>

      <main class="feature relative">
        <header class="hidden">App bar</header>

        <section class="sm:(ps-8 pe-8) pe-2 ps-2">
          <h1>Dashboard</h1>
        </section>

        <footer class="border-t-solid border-t-width-6 border-t-color-neutral-border-300 absolute bottom-0 left-0 right-0 h-20 p-4">
          Notes/discord
        </footer>
      </main>
    </>
  )
}
