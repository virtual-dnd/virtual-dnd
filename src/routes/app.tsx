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
            activeClass="secondary-active-icon-btn"
            class="secondary-icon-btn block"
            href="/app/@me"
          >
            <OcCopilot2 aria-hidden="true" size={24} title="User Profile" />
          </A>

          <hr />

          <A
            aria-label="Add party"
            activeClass="secondary-active-icon-btn"
            class="secondary-icon-btn block"
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
