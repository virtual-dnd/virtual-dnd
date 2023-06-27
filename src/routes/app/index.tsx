import { createRouteAction } from 'solid-start'
import { signOut } from '~/db/session.ts'

export default function App() {
  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  return (
    <div class="app-grid">
      <div class="server-bar">+</div>

      <div class="side-bar relative">
        Channels
        <div class="left-0flex absolute bottom-0 left-0 right-0 w-full justify-between bg-surface-300 p-2">
          <Form>
            <button class="action-secondary-btn w-full" type="submit">
              sign out
            </button>
          </Form>
        </div>
      </div>

      <main class="feature">
        <header>App bar</header>
        <section>main page content</section>
        <section>Notes/discord</section>
      </main>
    </div>
  )
}
