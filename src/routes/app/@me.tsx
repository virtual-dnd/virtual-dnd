import { OcSignout2 } from 'solid-icons/oc'
import { A, createRouteAction } from 'solid-start'
import { signOut } from '~/db/session.ts'

export default function Me() {
  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  return (
    <>
      <div class="side-bar relative">
        <div>Profile banner</div>

        <nav>
          <ul>
            <li>
              <A activeClass="active-link" href="/app/@me">
                Profile
              </A>
            </li>
          </ul>
        </nav>

        <div class="left-0flex absolute bottom-0 left-0 right-0 w-full justify-between bg-surface-300 p-2">
          <Form>
            <button class="action-secondary-btn w-full" type="submit">
              Sign out
              <OcSignout2 aria-hidden="true" size={24} title="Sign out" />
            </button>
          </Form>
        </div>
      </div>

      <main class="feature relative">
        <section>Profile Form</section>
      </main>
    </>
  )
}
