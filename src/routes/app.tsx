import { For, Suspense } from 'solid-js'
import { A, ErrorBoundary, Outlet, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { OcPlus2, OcCopilot2 } from 'solid-icons/oc'
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
        <nav class="flex flex-col gap-2 py-1">
          <A
            aria-label="Me page"
            activeClass="animate-grow-radius text-action-text-300"
            class="bg-neutral-surface-100 hover:(animate-grow-radius bg-action-link-hover text-action-text-300) aria-[current=page]:bg-action-link-active transition-2 inline-flex h-12 w-12 items-center justify-center rounded-full p-2"
            href="/app/@me"
          >
            <OcCopilot2 aria-hidden="true" size={24} title="User Profile" />
          </A>

          <hr class="bg-neutral-border-300 h-2px w-full border-none" />

          <For each={data()?.groups}>
            {(group) => (
              <A
                aria-label={group.name}
                activeClass="animate-grow-radius"
                class="bg-info-surface-100 text-info-text-100 hover:animate-grow-radius aria-[current=page]:bg-action-link-active inline-flex h-12 w-12 items-center justify-center rounded-full p-2 transition ease-in-out"
                href={`/app/${group.id}`}
              >
                {group.name[0]}
              </A>
            )}
          </For>

          <A
            aria-label="Add group"
            activeClass="animate-grow-radius text-success-text-200"
            class="bg-neutral-surface-100 text-success-text-inverse hover:(animate-grow-radius bg-success-bg-100 text-success-text-200) aria-[current=page]:(bg-success-bg-100 text-success-text-200) inline-flex h-12 w-12 items-center justify-center rounded-full p-2 transition ease-in-out"
            href="/app/create-group"
          >
            <OcPlus2 aria-hidden="true" size={24} title="Add group" />
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
