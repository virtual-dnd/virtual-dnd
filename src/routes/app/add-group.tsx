import { For } from 'solid-js'
import { A, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'

export function routeData() {
  return createServerData$(async () => {
    const linkOptions = [
      {
        label: 'Create a group',
        href: '/app/create-group',
        class: 'i-octicon:dependabot-24 text-action-text-100 text-lg',
      },
      {
        label: 'Join a group',
        href: '/app/join-group',
        class: 'i-octicon:people-24 text-action-text-100 text-lg',
      },
    ]

    return {
      options: linkOptions,
    }
  })
}

export default function AddGroup() {
  const data = useRouteData<typeof routeData>()

  return (
    <div class="w-screen">
      <div class="bg-neutral-surface-300 flex h-full w-full flex-col items-center justify-center p-6">
        <div class="bg-neutral-surface-100 max-w-70ch rounded-md p-4 text-center shadow-xl ">
          <header class="mb-2">
            <h2>Create a group</h2>
            <p class="text-neutral-text-300">
              Your group is where you and your friends hang out during game
              sessions.
            </p>
          </header>

          <ul>
            <For each={data()?.options}>
              {(option) => (
                <li class="my-3 w-full">
                  <A
                    class="border-1 border-neutral-border-300 decoration-none text-action-link-hover block inline-flex w-full items-center gap-4 rounded-lg border-solid p-6 text-left font-bold"
                    href={option.href}
                  >
                    <span class="bg-action-link inline-block flex flex-col items-center justify-center rounded-full p-2">
                      <div aria-hidden="true" class={option.class} />
                    </span>
                    {option.label}
                  </A>
                </li>
              )}
            </For>
          </ul>

          <footer class="mt-4">
            <small class="text-neutral-text-200">
              Choose which option you want to do.
            </small>
          </footer>
        </div>
      </div>
    </div>
  )
}
