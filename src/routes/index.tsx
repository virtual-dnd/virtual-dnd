import { Navigate, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { type Session } from '@supabase/supabase-js'
import styles from './index.module.css'
import Nav from '~/components/nav/nav.tsx'
import { getUserSession } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, event) => {
    const sessionJSON = await getUserSession(event.request)
    const session = await sessionJSON.json()
    return session
  })
}

export default function Home() {
  const session = useRouteData<Session>()

  // TODO: Discord shows button switching to app if logged in

  if (session().user) {
    return <Navigate href="/app" />
  }

  return (
    <div class={styles.wrapper}>
      <div class={styles.feature}>
        <Nav session={false} />

        <main class={styles.main}>
          <h1>Home</h1>
          <p>This will have some cool marketing stuff later...</p>
        </main>
      </div>

      <section class={styles.section}>
        <h2>Another cool saying...</h2>
        <p>More wow factor...</p>
      </section>

      <footer class={styles.footer}>
        <small>Please fund me...</small>
      </footer>
    </div>
  )
}
