import { Navigate, type RouteDataArgs, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import styles from './index.module.css'
import Nav from '~/components/nav/nav.tsx'
import { getUserSession, verifyMagicLink } from '~/db/session.ts'

export function routeData({ location: { search } }: RouteDataArgs) {
  const codeKey = 'code='

  if (search.includes(codeKey)) {
    return createServerData$(
      async ([code]) => {
        // TODO: Figure out why we are getting this error:
        // entry-client.tsx:3 AuthApiError: invalid request: both auth code and code verifier should be non-empty

        await verifyMagicLink(code)
        return null
        // return { session }
      },
      {
        key: () => [search.split(codeKey)[1]],
      }
    )
  }

  return createServerData$(async (_, event) => {
    // const session = await getUserSession(event.request)
    // console.log('session', session)
    return null
    // return { session }
  })
}

export default function Home() {
  const session = useRouteData<typeof routeData>()

  // console.log('session', session())

  if (session()) {
    return <Navigate href="/app" />
  }

  return (
    <div class={styles.wrapper}>
      <div class={styles.feature}>
        <Nav session={session()} />

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
