import { For, Show, Suspense } from 'solid-js'
import { A, ErrorBoundary, Outlet, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { ErrorMessage } from '~/components/index.ts'
import { getUser } from '~/db/session.ts'
import { getUserGroups } from '~/db/groups.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const { user } = await getUser(request)
    const groups = await getUserGroups(user?.id, request)
    return {
      groups: groups.data ?? [],
    }
  })
}

export default function App() {
  const data = useRouteData<typeof routeData>()

  return (
    <div class="app-grid">
      <div class="server-bar">
        <nav class="sm:(flex-col) flex gap-2 py-1">
          <A
            aria-label="Me page"
            activeClass="animate-grow-radius active-server-item"
            class="server-item bg-neutral-surface-100 text-neutral-text-100 hover:(animate-grow-radius bg-action-link-active text-action-text-300) aria-[current=page]:(bg-action-link-active text-action-text-300) transition-2 relative relative inline-flex h-12 w-12 items-center justify-center rounded-full p-2"
            href="/app/@me"
          >
            <div aria-hidden="true" class="i-octicon:copilot-24 text-3xl" />
          </A>

          <hr class="bg-neutral-border-300 h-2px sm:(block) hidden w-full border-none" />

          <For each={data()?.groups}>
            {(group) => (
              <A
                aria-label={group.name}
                activeClass="animate-grow-radius active-server-item"
                class="bg-info-surface-100 text-info-text-100 hover:animate-grow-radius aria-[current=page]:(bg-action-link-active) relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition ease-in-out"
                href={`/app/${group.id}`}
              >
                <Show when={group.avatar} fallback={group.name[0]}>
                  <img
                    alt="Group avatar"
                    class="h-full w-full"
                    src={group.avatar}
                  />
                </Show>
              </A>
            )}
          </For>

          <A
            aria-label="Add group"
            activeClass="animate-grow-radius text-success-text-200 active-server-item"
            class="bg-neutral-surface-100 text-success-text-inverse hover:(animate-grow-radius bg-success-bg-100 text-success-text-200) aria-[current=page]:(bg-success-bg-100 text-success-text-200) relative inline-flex h-12 w-12 items-center justify-center rounded-full p-2 transition ease-in-out"
            href="/app/create-group"
          >
            <div aria-hidden="true" class="i-octicon:plus-16 text-2xl" />
          </A>
        </nav>
      </div>

      <Suspense>
        <ErrorBoundary fallback={(error) => <ErrorMessage error={error} />}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
