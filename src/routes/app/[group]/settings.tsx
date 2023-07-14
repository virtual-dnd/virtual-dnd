import { Show, createEffect, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import {
  A,
  type RouteDataArgs,
  useSearchParams,
  useRouteData,
} from 'solid-start'
import {
  createServerAction$,
  createServerData$,
  redirect,
} from 'solid-start/server'
import { FormErrorMessage, FormFooter } from '~/components/index.ts'
import {
  deleteGroup,
  deleteGroupAvatar,
  getGroup,
  updateGroup,
  updateGroupAvatar,
} from '~/db/groups.ts'
import { getUser } from '~/db/session.ts'

export function routeData({ params }: RouteDataArgs<{ group: string }>) {
  return createServerData$(
    async (groupId, { request }) => {
      const { id } = await getUser(request)
      const { group } = await getGroup(groupId, request)
      return {
        user: { id },
        group,
      }
    },
    { key: () => params.group }
  )
}

export default function Settings() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
  const [avatar, setAvatar] = createSignal<string>('')
  const [showDeleteGroup, setShowDeleteGroup] = createSignal(false)
  const [showFooter, setShowFooter] = createStore({
    avatar: false,
    profile: false,
  })

  const [updating, { Form: GroupProfileForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const id = formData.get('group') as string

      const response = await updateGroup(
        {
          avatar: null,
          id,
          name: formData.get('name') as string,
        },
        request
      )

      return response.data
    }
  )

  const [updatingAvatar, { Form: AvatarForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const user_id = formData.get('user_id') as string
      const id = formData.get('group') as string
      const name = formData.get('name') as string
      const currentAvatar = formData.get('current_avatar') as string
      const avatar = formData.get('avatar') as File
      let avatarUrl = ''

      if (currentAvatar.includes(avatar.name)) {
        return 'same avatar'
      }

      if (avatar?.name) {
        const avatarResponse = await updateGroupAvatar(
          { avatar, user_id, name },
          request
        )
        avatarUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${avatarResponse.data.path}`
      }

      const response = await updateGroup(
        {
          id,
          avatar: avatarUrl ?? null,
        },
        request
      )

      return response.data
    }
  )

  const [removingAvatar, handleRemoveAvatar] = createServerAction$(
    async (
      options: {
        path: string | null | undefined
        id: string
      },
      { request }
    ) => {
      const { path, id } = options

      if (!path) return

      await updateGroup(
        {
          id,
          avatar: null,
        },
        request
      )
      await deleteGroupAvatar(path.split('avatars/').pop() as string, request)

      return 'avatar deleted'
    }
  )

  const [deletingGroup, { Form: DeleteGroupForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const id = formData.get('group') as string

      if (formData.get('confirm') !== formData.get('name')) {
        throw new Error('Group name does not match')
      }

      await deleteGroup(id, request)
      return redirect('/app')
    }
  )

  function handleAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      setAvatar(file?.name)
    }

    setShowFooter('avatar', true)
  }

  createEffect(() => {
    if (updating.result) {
      setShowFooter('profile', false)
    }

    if (updatingAvatar.result || removingAvatar.result) {
      setAvatar('')
      setShowFooter('avatar', false)
    }
  })

  return (
    <>
      <div class="side-bar relative">
        <nav class="py-2 pe-4 ps-4">
          <ul>
            <li>
              <A
                activeClass="text-action-link-hover decoration-action-link underline"
                class="block px-2 font-medium"
                href="/app/[group]/settings"
              >
                Group Settings
              </A>
            </li>
          </ul>
        </nav>
      </div>

      <main class="feature min-w-30ch max-w-80ch sm:(ps-12 pe-12) relative overflow-y-auto pb-6 pe-4 ps-4">
        <h1 class="text-neutral-text-400">Group Settings</h1>

        <Show when={updating.error}>
          <FormErrorMessage error={updating.error} />
        </Show>

        <GroupProfileForm>
          <input type="hidden" name="group" value={data()?.group?.id} />

          <label for="name">
            Group Name
            <input
              class="border-neutral-surface-300 mt-1 block w-full rounded-md border p-2"
              id="name"
              onChange={() => setShowFooter('profile', true)}
              placeholder='e.g. "My Group"'
              name="name"
              required
              type="text"
              value={data()?.group?.name}
            />
          </label>

          <Show when={showFooter.profile}>
            <FormFooter onCancel={() => setShowFooter('profile', false)}>
              <button
                class="bg-action-bg-100 text-action-text-300 hover:bg-action-bg-100-hover w-full"
                type="submit"
              >
                <Show when={updating?.pending} fallback={<>Save Changes</>}>
                  Updating
                  <div
                    aria-hidden="true"
                    class="i-line-md:loading-twotone-loop scale-160"
                  />
                </Show>
              </button>
            </FormFooter>
          </Show>
        </GroupProfileForm>

        <hr class="bg-neutral-border-300 h-2px my-8 w-full border-none" />

        <AvatarForm>
          <Show when={updatingAvatar.error}>
            <FormErrorMessage error={updatingAvatar.error} />
          </Show>

          <input type="hidden" name="user_id" value={data()?.user?.id} />
          <input
            type="hidden"
            name="current_avatar"
            value={data()?.group?.avatar ?? ''}
          />
          <input type="hidden" name="group" value={data()?.group?.id} />
          <input type="hidden" name="name" value={data()?.group?.name} />

          <div class="flex items-center justify-start gap-2">
            <label for="avatar">
              Avatar
              <div class="btn bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover mt-1 normal-case">
                Change Avatar
                <input
                  accept=".jp,.jpeg,.png,.gif,.svg"
                  id="avatar"
                  name="avatar"
                  onChange={handleAvatarChange}
                  type="file"
                />
              </div>
            </label>

            <button
              class="text-action-bg-100 hover:text-action-text-inverse translate-y-3 border-0"
              id="avatar"
              name="avatar"
              onClick={() => {
                handleRemoveAvatar({
                  id: data()?.group?.id ?? '',
                  path: data()?.group?.avatar,
                })
              }}
              type="button"
            >
              Remove Avatar
            </button>
          </div>

          <Show when={avatar()}>
            <div class="flex items-center gap-2">
              <div class="i-line-md:clipboard-twotone-to-clipboard-twotone-check-transition text-success-text-inverse scale-160" />
              <p class="text-neutral-text-300">{avatar()}</p>
            </div>
          </Show>

          <Show when={showFooter.avatar}>
            <FormFooter onCancel={() => setShowFooter({ avatar: false })}>
              <button
                class="bg-action-bg-100 text-action-text-300 hover:bg-action-bg-100-hover w-full"
                type="submit"
              >
                <Show when={updatingAvatar?.pending} fallback={'Save Changes'}>
                  Updating
                  <div
                    aria-hidden="true"
                    class="i-line-md:loading-twotone-loop scale-160"
                  />
                </Show>
              </button>
            </FormFooter>
          </Show>
        </AvatarForm>

        <hr class="bg-neutral-border-300 h-2px my-8 w-full border-none" />

        <div>
          <h2 class="text-neutral-text-400">Danger Zone</h2>
          <p class="text-neutral-text-300">
            Once you delete a group, there is no going back. Please be certain.
          </p>

          <Show when={deletingGroup.error}>
            <FormErrorMessage error={deletingGroup.error} />
          </Show>

          <Show
            when={showDeleteGroup()}
            fallback={
              <button
                class="bg-danger-bg-100 text-danger-text-200 hover:bg-danger-bg-100-hover"
                onClick={() => setShowDeleteGroup(true)}
                type="button"
              >
                Delete Group
              </button>
            }
          >
            <DeleteGroupForm class="animated animated-fade-in animated-fast">
              <input type="hidden" name="group" value={data()?.group?.id} />
              <input type="hidden" name="name" value={data()?.group?.name} />

              <label class="relative mb-4" for="confirm">
                Confirm Group Name
                <input
                  aria-invalid={deletingGroup.error ? 'true' : 'false'}
                  type="text"
                  name="confirm"
                  placeholder={`Type "${data()?.group?.name}" to confirm`}
                  required
                />
                <Show when={deletingGroup.error}>
                  <span class="bottom-13px w-22px absolute right-1">
                    <div
                      aria-hidden="true"
                      class="i-line-md:alert-twotone scale-160 text-danger-text-100"
                    />
                  </span>
                </Show>
              </label>

              <button class="text-action-bg-100 hover:text-action-text-inverse mr-2 border-0">
                Cancel
              </button>

              <button
                class="bg-danger-bg-100 text-danger-text-200 hover:bg-danger-bg-100-hover"
                type="submit"
              >
                <Show
                  when={deletingGroup?.pending}
                  fallback={<>Delete Group</>}
                >
                  Deleting
                  <div
                    aria-hidden="true"
                    class="i-line-md:loading-twotone-loop scale-160"
                  />
                </Show>
              </button>
            </DeleteGroupForm>
          </Show>
        </div>

        <Show when={searchParams.debug}>
          <code class="mt-10 block">
            <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
            <pre>group: {JSON.stringify(data()?.group, null, 2)}</pre>
          </code>
        </Show>
      </main>
    </>
  )
}
