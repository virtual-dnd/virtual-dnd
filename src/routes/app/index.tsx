import { getSession } from '@solid-auth/base'
import { signOut } from '@solid-auth/base/client'
import { Show, onMount, type VoidComponent } from 'solid-js'
import { useRouteData } from 'solid-start'
import { createServerData$, redirect } from 'solid-start/server'
import styles from './app.module.css'
import { authOptions } from '~/server/auth.ts'
import { setTheme } from '~/store/theme.ts'

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions)
    if (!session) {
      throw redirect('/')
    }
    return session
  })
}

const Protected: VoidComponent = () => {
  const session = useRouteData<typeof routeData>()

  onMount(() => {
    setTheme('dark')
  })

  return (
    <Show when={session()} keyed>
      {(us) => (
        <div>
          <header class={styles.header}>
            {us.user?.image ? (
              <span class={styles.avatar}>
                <img
                  alt={us.user?.name ?? 'user avatar'}
                  class={styles.avatarImg}
                  src={us.user?.image}
                />
              </span>
            ) : null}

            <button
              class="round action"
              onClick={() =>
                void signOut({
                  redirectTo: '/',
                  redirect: true,
                })
              }
            >
              Sign Out
            </button>
          </header>

          <main class={styles.main}>
            <span>Hey there {us.user?.name}! You are signed in!</span>
          </main>
        </div>
      )}
    </Show>
  )
}

export default Protected
