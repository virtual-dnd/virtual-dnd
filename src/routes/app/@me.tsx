import { OcCopilot2, OcSignout2 } from 'solid-icons/oc'
import { Show, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import {
  A,
  createRouteAction,
  useRouteData,
  useSearchParams,
} from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import { Puff } from 'solid-spinner'
import { FormErrorMessage, FormFooter } from '~/components/index.ts'
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
    const { user } = await getUser(request)
    const profile = await getUserProfile(request)
    return {
      user,
      profile: profile.data ?? null,
    }
  })
}

export default function Me() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
  const [showFooter, setShowFooter] = createStore({
    profile: false,
    avatar: false,
  })

  const [, { Form }] = createRouteAction(async () => {
    return signOut()
  })

  const [updating, { Form: ProfileForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const id = formData.get('id') as string
      const hasProfile = formData.get('has_profile') as string
      const fallbackDisplayName = `#${id.substring(0, 7)}`

      if (hasProfile === 'false') {
        await createUserProfile(
          {
            id,
            avatar: null,
            display_name: fallbackDisplayName,
            pronouns: null,
          } as UserProfileForm,
          request
        )
        return
      }

      const response = await updateUserProfile(
        {
          id,
          display_name: formData.get('display_name') || fallbackDisplayName,
          pronouns: formData.get('pronouns'),
        } as UserProfileForm,
        request
      )

      return response.data
    }
  )

  const [updatingAvatar, { Form: AvatarForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const avatar = formData.get('avatar') as File
      const currentAvatar = formData.get('current_avatar') as string
      const id = formData.get('id') as string
      let avatarUrl = ''

      if (currentAvatar.includes(avatar.name)) {
        return 'same avatar'
      }

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
    if (updating.result) {
      setShowFooter('profile', false)
    }

    if (updatingAvatar.result || removingAvatar.result) {
      setShowFooter('avatar', false)
    }
  })

  return (
    <>
      <div class="side-bar relative">
        <div class="bg-info-surface-100 text-neutral-text-inverse h-20 p-2">
          Profile banner
        </div>

        <nav class="p-2">
          <ul>
            <li>
              <A
                activeClass="text-action-link-hover decoration-action-link underline"
                href="/app/@me"
              >
                Profile
              </A>
            </li>
          </ul>
        </nav>

        <div class="bg-neutral-surface-300 absolute bottom-0 left-0 flex w-full justify-between p-2">
          <Form class="w-full">
            <button
              class="bg-action-bg-200 text-action-text-200 w-full fill-slate-300"
              type="submit"
            >
              Sign out
              <OcSignout2 aria-hidden="true" size={24} title="Sign out" />
            </button>
          </Form>
        </div>
      </div>

      <main class="feature relative w-[46.25rem] overflow-y-auto px-12 pb-6">
        <h1 class="text-neutral-text-400">User Profile</h1>

        <Show when={updating.error}>
          <FormErrorMessage error={updating.error} />
        </Show>

        <div class="mt-6">
          <div class="bg-neutral-surface-400 relative mb-6 rounded-lg p-2">
            <div class="bg-neutral-surface-100 h-20 overflow-hidden rounded-sm">
              <Show when={data()?.profile?.profile_banner}>
                <img alt="Profile banner" class="h-full w-full" src="" />
              </Show>

              <div class="bg-info-surface-100 absolute left-4 top-14 flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-full border-2 fill-white">
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

            <div class="px-4 pb-2 pt-6">
              <p class="text-neutral-text-400 mb-none font-extrabold">
                {data()?.profile?.display_name}
              </p>
              <small class="text-neutral-text-100">
                {data()?.profile?.pronouns}
              </small>
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

            <label for="display_name">
              Display Name
              <input
                aria-invalid={updating.error ? 'true' : 'false'}
                id="display_name"
                type="text"
                name="display_name"
                onKeyPress={() => setShowFooter('profile', true)}
                placeholder={data()?.user?.email ?? ''}
                value={data()?.profile?.display_name ?? ''}
              />
            </label>
            <small>The name everyone in your party will see.</small>

            <label class="mt-4" for="pronouns">
              Pronouns
              <input
                aria-invalid={updating.error ? 'true' : 'false'}
                id="pronouns"
                name="pronouns"
                onKeyPress={() => setShowFooter('profile', true)}
                placeholder="Add your pronouns"
                type="text"
                value={data()?.profile?.pronouns ?? ''}
              />
            </label>
            <small>The pronouns you identify with.</small>

            <Show when={showFooter.profile}>
              <FormFooter>
                <button
                  class="text-action-bg-100 hover:text-action-text-inverse w-full  border-0"
                  onClick={() => setShowFooter('profile', false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  class="bg-action-bg-100 text-action-text-300 hover:bg-action-bg-100-hover w-full"
                  type="submit"
                >
                  <Show when={updating?.pending} fallback={'Save Changes'}>
                    Updating
                    <Puff aria-hidden="true" color="white" width="30" />
                  </Show>
                </button>
              </FormFooter>
            </Show>
          </ProfileForm>

          <hr class="bg-neutral-border-300 h-2px my-8 w-full border-none" />

          <AvatarForm>
            <input type="hidden" id="id" name="id" value={data()?.user?.id} />
            <input
              type="hidden"
              name="current_avatar"
              value={data()?.profile.avatar ?? ''}
            />

            <div class="flex items-center justify-start gap-2">
              <label
                class="btn bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover normal-case"
                for="avatar"
              >
                Change Avatar
                <input
                  accept=".jp,.jpeg,.png,.gif,.svg"
                  id="avatar"
                  name="avatar"
                  onChange={() => setShowFooter('avatar', true)}
                  type="file"
                />
              </label>
              <button
                class="text-action-bg-100 hover:text-action-text-inverse border-0"
                id="avatar"
                name="avatar"
                onClick={() => {
                  setShowFooter('avatar', true)
                  handleRemoveAvatar({
                    id: data()?.user?.id ?? '',
                    path: data()?.profile?.avatar,
                  })
                }}
                type="button"
              >
                Remove Avatar
              </button>
            </div>

            <Show when={showFooter.avatar}>
              <FormFooter>
                <button
                  class="text-action-bg-100 hover:text-action-text-inverse w-full  border-0"
                  onClick={() => setShowFooter({ avatar: false })}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  class="bg-action-bg-100 text-action-text-300 hover:bg-action-bg-100-hover w-full"
                  type="submit"
                >
                  <Show
                    when={updatingAvatar?.pending}
                    fallback={'Save Changes'}
                  >
                    Updating
                    <Puff aria-hidden="true" color="white" width="30" />
                  </Show>
                </button>
              </FormFooter>
            </Show>
          </AvatarForm>
        </div>

        <Show when={searchParams.debug}>
          <code class="mt-10 block">
            <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
            <pre>profile: {JSON.stringify(data()?.profile, null, 2)}</pre>
          </code>
        </Show>
      </main>
    </>
  )
}
