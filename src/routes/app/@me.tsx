import { OcSignout2 } from 'solid-icons/oc'
import { A, createRouteAction, useRouteData } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import { getUserProfile, type User } from '~/db/profiles.ts'
import { signOut } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const response = await getUserProfile(request)
    return response.data
  })
}

export default function Me() {
  const user = useRouteData<User>()

  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  // TODO: Figure out how to update user profile

  // 1. on-change show footer pop-up that changes have been made and not saved
  // like Discord
  // 2. on button submit in pop-up, update user profile

  // const [updating, { Form: ProfileForm }] = createServerAction$(async (form: FormData) => {
  //   const name = form.get('name') as string
  //   const email = form.get('email') as string
  //   const { data, error } = await supabase.from('profiles')
  //     .update({ other_column: 'otherValue' })
  //     .eq('some_column', 'someValue')
  //     .select()

  return (
    <>
      <div class="side-bar relative">
        <div class="h-20 bg-info-background p-2 text-text-inverse">
          Profile banner
        </div>

        <nav class="p-2">
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

      <main class="feature relative px-8 pt-10">
        <h1 class="bolder text-xl font-black">My Account</h1>

        <div class="mt-6 max-w-md">
          <form>
            <label class="block" html-for="name">
              Display Name
            </label>
            <input id="name" type="text" name="name" value={user()?.name} />
            <small class="text-help">
              The name everyone in your party will see.
            </small>

            <hr class="my-6" />

            <label class="block" html-for="prounouns">
              Pronouns
            </label>
            <input
              id="prounouns"
              name="prounouns"
              placeholder='e.g. "he/him", "she/her", "they/them"'
              type="text"
              value={user()?.pronouns}
            />
            <small class="text-help">The pronouns you identify with.</small>

            <hr class="my-6" />
          </form>

          <form>
            <label class="block" html-for="avatar">
              Avatar
            </label>
            <button
              class="action-secondary-btn"
              id="avatar"
              name="avatar"
              type="submit"
              value="change"
            >
              Change Avatar
            </button>
            <button
              class="action-text-btn"
              id="avatar"
              name="avatar"
              type="submit"
              value="remove"
            >
              Change Avatar
            </button>
          </form>
        </div>

        <code class=" mt-10 block bg-surface-200 p-2">
          <pre>{JSON.stringify(user(), null, 2)}</pre>
        </code>
      </main>
    </>
  )
}
