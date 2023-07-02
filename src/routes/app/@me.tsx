import { OcCopilot2, OcSignout2 } from 'solid-icons/oc'
import { Show, createEffect, createSignal } from 'solid-js'
import {
  A,
  createRouteAction,
  useRouteData,
  useSearchParams,
} from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import {
  getUserProfile,
  updateUserAvatar,
  updateUserProfile,
  type UserProfile,
  type UserProfileForm,
} from '~/db/profiles.ts'
import { signOut } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const response = await getUserProfile(request)
    return response.data
  })
}

export default function Me() {
  const user = useRouteData<UserProfile>()
  const [searchParams] = useSearchParams()
  const [showFooter, setShowFooter] = createSignal<boolean>(false)
  let avatarRef: HTMLInputElement

  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  const [updating, { Form: ProfileForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const avatar = formData.get('avatar') as File
      const id = formData.get('id') as string
      let avatarUrl = ''

      if (avatar?.name) {
        const avatarResponse = await updateUserAvatar({ avatar, id }, request)
        avatarUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${avatarResponse.data.path}`
      }

      const response = await updateUserProfile(
        {
          id,
          avatar: avatarUrl ?? null,
          display_name: formData.get('display_name'),
          pronouns: formData.get('pronouns'),
        } as UserProfileForm,
        request
      )

      return response.data
    }
  )

  // TODO: Add new delete avatar action and replace this with it
  function handleRemoveAvatar() {
    avatarRef.value = ''
    setShowFooter(true)
  }

  createEffect(() => {
    if (updating.pending) setShowFooter(false)
  })

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

      <main class="feature relative w-[46.25rem] overflow-y-auto px-12 pb-6 pt-10">
        <h1 class="bolder text-xl font-black">User Profile</h1>

        <Show when={updating.error}>
          <div class="mb-2 rounded-lg bg-danger-background p-2 text-text-100">
            <p class="text-danger-text">
              Something went wrong: {updating.error.message}
            </p>
          </div>
        </Show>

        <div class="mt-6 ">
          <div class="relative mb-6 rounded-lg bg-surface-400 p-2">
            <div class="h-20 overflow-hidden rounded-sm bg-surface-100">
              <Show when={user()?.profile_banner}>
                <img alt="Profile banner" class="h-full w-full" src="" />
              </Show>

              <div class="absolute left-4 top-14 flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-full border-2 bg-background fill-white">
                <Show
                  when={user()?.avatar}
                  fallback={
                    <OcCopilot2
                      aria-hidden="true"
                      size={24}
                      title="User Profile"
                    />
                  }
                >
                  <img
                    alt="Avatar"
                    class="h-full w-full"
                    src={user()?.avatar}
                  />
                </Show>
              </div>
            </div>

            <div class="px-4 pb-2 pt-8">
              <p class="font-extrabold">{user()?.display_name}</p>
              <small class="text-text-100">{user()?.pronouns}</small>
            </div>
          </div>

          <ProfileForm>
            <input type="hidden" id="id" name="id" value={user()?.id} />

            <label class="block" html-for="display_name">
              Display Name
            </label>
            <input
              id="display_name"
              type="text"
              name="display_name"
              onKeyPress={() => setShowFooter(true)}
              placeholder='e.g. "Jane Doe"'
              value={user()?.display_name}
            />
            <small class="text-help">
              The name everyone in your party will see.
            </small>

            <hr class="my-6" />

            <label class="block" html-for="pronouns">
              Pronouns
            </label>
            <input
              id="pronouns"
              name="pronouns"
              onKeyPress={() => setShowFooter(true)}
              placeholder='e.g. "he/him", "she/her", "they/them"'
              type="text"
              value={user()?.pronouns}
            />
            <small class="text-help">The pronouns you identify with.</small>

            <hr class="my-6" />

            <label class="block" html-for="avatar">
              Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              onChange={() => setShowFooter(true)}
              ref={avatarRef}
              type="file"
            >
              Change Avatar
            </input>
            <button
              class="action-text-btn"
              id="avatar"
              name="avatar"
              onClick={handleRemoveAvatar}
              type="button"
            >
              Remove Avatar
            </button>

            <Show when={showFooter()}>
              <div class="align-center absolute bottom-4 left-0 right-0 mx-4 flex w-full flex-1 animate-bounce-in-from-bottom items-center justify-between rounded-md bg-surface-100 px-4 py-2 drop-shadow-2xl">
                <p>Careful -- you have unsaved changes!</p>

                <div class="flex grow gap-2 px-2">
                  <button
                    class="action-text-btn w-full"
                    onClick={() => setShowFooter(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button class="action-btn w-full" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </Show>
          </ProfileForm>
        </div>

        <Show when={searchParams.debug}>
          <code class=" mt-10 block bg-surface-200 p-2">
            <pre>{JSON.stringify(user(), null, 2)}</pre>
          </code>
        </Show>
      </main>
    </>
  )
}
