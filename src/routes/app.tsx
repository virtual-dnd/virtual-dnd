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
            activeClass="animate-grow-radius fill-action-text-300"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-surface-100 fill-action-bg-200 p-2 transition ease-in-out hover:animate-grow-radius hover:bg-action-link-hover hover:fill-action-text-300 aria-[current=page]:bg-action-link-active"
            href="/app/@me"
          >
            <OcCopilot2 aria-hidden="true" size={24} title="User Profile" />
          </A>

          <hr />

          <For each={data()?.groups}>
            {(group) => (
              <A
                aria-label={group.name}
                activeClass="animate-grow-radius"
                class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-info-surface-100 p-2 text-info-text-100 transition ease-in-out hover:animate-grow-radius aria-[current=page]:bg-action-link-active"
                href={`/app/${group.id}`}
              >
                {group.name[0]}
              </A>
            )}
          </For>

          <A
            aria-label="Add party"
            activeClass="animate-grow-radius fill-success-text-200"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-surface-100 fill-success-text-inverse p-2 transition ease-in-out hover:animate-grow-radius hover:bg-success-bg-100 hover:fill-success-text-200 aria-[current=page]:bg-success-bg-100"
            href="/app/create-party"
          >
            <OcPlus2 aria-hidden="true" size={24} title="Add party" />
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
