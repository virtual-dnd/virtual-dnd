import { Suspense } from 'solid-js'
import { A, ErrorBoundary, Outlet } from 'solid-start'
import { OcPlus2, OcCopilot2 } from 'solid-icons/oc'

export default function App() {
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
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
