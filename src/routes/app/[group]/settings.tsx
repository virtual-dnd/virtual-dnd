import { Show } from 'solid-js'
import { A, useSearchParams } from 'solid-start'

export default function Settings() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <div class="side-bar relative">
        <nav class="py-2 pe-4 ps-4">
          <ul>
            <li>
              <A
                activeClass="text-action-link-hover decoration-action-link underline"
                class="block px-2 font-medium"
                href="/app/[group]/settings"
              >
                Group Settings
              </A>
            </li>
          </ul>
        </nav>
      </div>

      <main class="feature min-w-30ch max-w-80ch sm:(ps-12 pe-12) relative overflow-y-auto pb-6 pe-4 ps-4">
        <h1 class="text-neutral-text-400">Group Settings</h1>

        <Show when={searchParams.debug}>
          <code class="mt-10 block">
            {/* <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
            <pre>group: {JSON.stringify(data()?.group, null, 2)}</pre> */}
          </code>
        </Show>
      </main>
    </>
  )
}
