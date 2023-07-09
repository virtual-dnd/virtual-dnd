import { Title } from 'solid-start'
import { HttpStatusCode } from 'solid-start/server'
import { signOut } from '~/db/session.ts'

export default function ServerError() {
  return (
    <main>
      <Title>Server Error</Title>
      <HttpStatusCode code={500} />
      <h1>Server Error</h1>
      <p>
        Sorry, there was a problem on the server. But don't worry, we've been
        notified and are looking into it now! :working_man:
      </p>

      <p>For your convenience, Sign out and back in to clear your cache.</p>

      <button
        class="bg-action-bg-100 text-action-text-100 hover:action-bg-100-hover"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </main>
  )
}
