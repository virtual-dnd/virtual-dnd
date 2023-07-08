import { Show, createEffect, createSignal } from 'solid-js'
import { useRouteData, useSearchParams } from 'solid-start'
import {
  createServerAction$,
  createServerData$,
  redirect,
} from 'solid-start/server'
import { FormErrorMessage, FormFooter } from '~/components/index.ts'
import {
  createGroup,
  createGroupAvatar,
  type GroupProfileForm,
} from '~/db/groups.ts'
import { getUser } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const { user } = await getUser(request)
    return {
      user,
    }
  })
}

export default function CreateGroup() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
  const [showFooter, setShowFooter] = createSignal(false)
  const [avatar, setAvatar] = createSignal<string>('')

  const [updating, { Form: GroupForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const id = formData.get('id') as string
      const name = formData.get('name') as string
      const avatar = formData.get('avatar') as File
      let avatarUrl = ''

      if (avatar?.name) {
        const avatarResponse = await createGroupAvatar(
          { avatar, user_id: id, name },
          request
        )
        avatarUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${avatarResponse.data.path}`
      }

      const { data } = await createGroup(
        {
          avatar: avatarUrl ?? null,
          name: name,
          user_id: id,
        } as GroupProfileForm,
        request
      )

      return redirect(`/app/${data?.id}`)
    }
  )

  function handleAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      setAvatar(file?.name)
    }

    setShowFooter(true)
  }

  createEffect(() => {
    if (updating.result) {
      setShowFooter(false)
    }
  })

  return (
    <div class="feature max-w-70ch relative p-8">
      <h1 class="text-neutral-text-400">Create Group</h1>
      <p class="text-neutral-text-300">
        Your group is where you and your friends hang out during game sessions.
        Create yours and adventure together!
      </p>

      <Show when={updating.error}>
        <FormErrorMessage error={updating.error} />
      </Show>

      <GroupForm class="mt-6">
        <input type="hidden" name="id" value={data()?.user?.id} />

        <label for="name" aria-describedby="name:help">
          Name (required)
          <input
            type="text"
            id="name"
            placeholder='e.g. "Hell Fire Club"'
            onChange={() => setShowFooter(true)}
            name="name"
            required
          />
        </label>
        <small id="name:help">The name you want your group to be called.</small>

        <div class="mt-8 flex items-center justify-start gap-4">
          <label for="avatar">
            Avatar
            <div class="btn bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover mt-1 normal-case">
              Add Avatar
              <input
                accept=".jp,.jpeg,.png,.gif,.svg"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
                type="file"
              />
            </div>
          </label>

          <Show when={avatar()}>
            <p class="translate-y-3">{avatar()}</p>
          </Show>
        </div>

        <Show when={showFooter()}>
          <FormFooter>
            <button
              class="text-action-bg-100 hover:text-action-text-inverse w-full  border-0"
              onClick={() => setShowFooter(false)}
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
                <div
                  aria-hidden="true"
                  class="i-line-md:loading-twotone-loop"
                />
              </Show>
            </button>
          </FormFooter>
        </Show>
      </GroupForm>

      <Show when={searchParams.debug}>
        <code class="mt-10 block">
          <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
        </code>
      </Show>
    </div>
  )
}
