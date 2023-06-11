import { getSession } from '@solid-auth/base'
import { Navigate, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import styles from './index.module.css'
import { authOptions } from '~/server/auth.ts'
import Nav from '~/components/nav/nav.tsx'

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions)
    return { session }
  })
}

export default function Home() {
  const session = useRouteData<typeof routeData>()

  if (session()?.session) {
    return <Navigate href="/app" />
  }

  return (
    <div class={styles.wrapper}>
      <div class={styles.feature}>
        <Nav session={session()?.session} />

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
