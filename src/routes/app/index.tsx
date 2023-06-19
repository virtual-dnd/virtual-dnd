import { getSession } from '@solid-auth/base'
import { signOut } from '@solid-auth/base/client'
import { Show, type VoidComponent } from 'solid-js'
import { useRouteData } from 'solid-start'
import { createServerData$, redirect } from 'solid-start/server'
import styles from './app.module.css'
import { authOptions } from '~/server/auth.ts'
import { supabase } from '~/lib/solidbaseClient.ts'

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions)
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', session?.user?.email)

    if (!session) {
      throw redirect('/')
    }

    return { session, user: data?.[0] ?? [] }
  })
}

const Protected: VoidComponent = () => {
  const session = useRouteData<typeof routeData>()

  console.log('user', session()?.user)

  return (
    <Show when={session()?.session} keyed>
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
