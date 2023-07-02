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
  createUserProfile,
  getUserProfile,
  removeUserAvatar,
  updateUserAvatar,
  updateUserProfile,
  type UserProfileForm,
} from '~/db/profiles.ts'
import { getUser, signOut } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    try {
      const { user } = await getUser(request)
      const profile = await getUserProfile(request)
      return {
        user,
        profile: profile.data ?? null,
      }
    } catch (error) {
      // TODO: Handle error
    }
  })
}

export default function Me() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
  const [showFooter, setShowFooter] = createSignal<boolean>(false)

  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  const [updating, { Form: ProfileForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const avatar = formData.get('avatar') as File
      const id = formData.get('id') as string
      const hasProfile = formData.get('has_profile') as string
      let avatarUrl = ''

      if (avatar?.name) {
        const avatarResponse = await updateUserAvatar({ avatar, id }, request)
        avatarUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${avatarResponse.data.path}`
      }

      if (hasProfile === 'false') {
        await createUserProfile(
          {
            id,
            avatar: avatarUrl ?? null,
            display_name: formData.get('display_name'),
            pronouns: formData.get('pronouns'),
          } as UserProfileForm,
          request
        )
        return
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

  const [removingAvatar, handleRemoveAvatar] = createServerAction$(
    async (
      options: {
        path: string
        id: string
      },
      { request }
    ) => {
      const { path, id } = options

      if (!path) return

      await updateUserProfile(
        {
          id,
          avatar: null,
        } as UserProfileForm,
        request
      )
      await removeUserAvatar(path.split('avatars/').pop() as string, request)
    }
  )

  createEffect(() => {
    if (updating.pending || removingAvatar.pending) setShowFooter(false)
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
              <Show when={data()?.profile?.profile_banner}>
                <img alt="Profile banner" class="h-full w-full" src="" />
              </Show>

              <div class="absolute left-4 top-14 flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-full border-2 bg-background fill-white">
                <Show
                  when={data()?.profile?.avatar}
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
                    src={data()?.profile?.avatar}
                  />
                </Show>
              </div>
            </div>

            <div class="px-4 pb-2 pt-8">
              <p class="font-extrabold">{data()?.profile?.display_name}</p>
              <small class="text-text-100">{data()?.profile?.pronouns}</small>
            </div>
          </div>

          <ProfileForm>
            <input type="hidden" id="id" name="id" value={data()?.user?.id} />
            <input
              type="hidden"
              id="has_profile"
              name="has_profile"
              value={Boolean(data()?.profile).toString()}
            />

            <label class="block" for="display_name">
              Display Name
            </label>
            <input
              id="display_name"
              type="text"
              name="display_name"
              onKeyPress={() => setShowFooter(true)}
              placeholder={data()?.user?.email ?? ''}
              value={data()?.profile?.display_name ?? ''}
            />
            <small class="text-help">
              The name everyone in your party will see.
            </small>

            <hr class="my-6" />

            <label class="block" for="pronouns">
              Pronouns
            </label>
            <input
              id="pronouns"
              name="pronouns"
              onKeyPress={() => setShowFooter(true)}
              placeholder="Add your pronouns"
              type="text"
              value={data()?.profile?.pronouns ?? ''}
            />
            <small class="text-help">The pronouns you identify with.</small>

            <hr class="my-6" />

            <label class="block" for="avatar">
              Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              onChange={() => setShowFooter(true)}
              type="file"
            >
              Change Avatar
            </input>
            <button
              class="action-text-btn"
              id="avatar"
              name="avatar"
              onClick={() => {
                setShowFooter(true)
                handleRemoveAvatar({
                  id: data()?.user?.id ?? '',
                  path: data()?.profile?.avatar,
                })
              }}
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
            <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
            <pre>profile: {JSON.stringify(data()?.profile, null, 2)}</pre>
          </code>
        </Show>
      </main>
    </>
  )
}
