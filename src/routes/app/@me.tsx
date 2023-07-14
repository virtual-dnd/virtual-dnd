import { ErrorBoundary, For, Suspense } from 'solid-js'
import { A, Outlet, createRouteAction, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { ErrorMessage } from '~/components/index.ts'
import { signOut } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async () => {
    const navLinks = [
      {
        href: '/app/@me',
        label: 'Account',
      },
      {
        href: '/app/@me/profile',
        label: 'User Profile',
      },
      {
        href: '/app/@me/group-profiles',
        label: 'Group Profiles',
      },
    ]
    return navLinks
  })
}

export default function Me() {
  const navLinks = useRouteData<typeof routeData>()

  const [, { Form: SignOutForm }] = createRouteAction(async () => {
    return signOut()
  })

  return (
    <>
      <div class="side-bar relative">
        <div class="bg-info-surface-100 text-neutral-text-inverse h-20 p-2">
          Profile banner
        </div>

        <nav class="py-2 pe-4 ps-4">
          <ul>
            <For each={navLinks()}>
              {(navItem) => (
                <li class="mb-1">
                  <A
                    activeClass="text-action-link-hover decoration-action-link decoration-underline font-bold bg-neutral-surface-400"
                    class="text-action-link underline-transparent hover:(underline-action-link text-action-link-hover bg-neutral-surface-400) block rounded-md p-2"
                    href={navItem.href}
                  >
                    {navItem.label}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>

        <div class="bg-neutral-surface-300 absolute bottom-0 left-0 flex w-full justify-between p-2">
          <SignOutForm class="w-full">
            <button
              class="bg-action-bg-200 text-action-text-200 hover:bg-action-bg-200-hover w-full transition"
              type="submit"
            >
              Sign out
              <div aria-hidden="true" class="i-octicon:sign-out-16 text-xl" />
            </button>
          </SignOutForm>
        </div>
      </div>

      <main class="feature min-w-30ch max-w-80ch sm:(ps-12 pe-12) relative overflow-y-auto pb-6 pe-4 ps-4">
        <Suspense>
          <ErrorBoundary fallback={(error) => <ErrorMessage error={error} />}>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
    </>
  )
}
