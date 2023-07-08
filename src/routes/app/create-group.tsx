import { Show, createEffect, createSignal } from 'solid-js'
import { useRouteData, useSearchParams } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
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

      await createGroup(
        {
          avatar: avatarUrl ?? null,
          name: name,
          user_id: id,
        } as GroupProfileForm,
        request
      )

      return 'success'
    }
  )

  // const [updatingAvatar, { Form: AvatarForm }] = createServerAction$(
  //   async (formData: FormData, { request }) => {
  //     const avatar = formData.get('avatar') as File
  //     let avatarUrl = ''

  //     if (avatar?.name) {
  //       const avatarResponse = await updateUserAvatar({ avatar, id }, request)
  //       avatarUrl = `${
  //         import.meta.env.VITE_SUPABASE_URL
  //       }/storage/v1/object/public/avatars/${avatarResponse.data.path}`
  //     }

  //     const response = await updateUserProfile(
  //       {
  //         id,
  //         avatar: avatarUrl ?? null,
  //       } as UserProfileForm,
  //       request
  //     )

  //     return response.data
  //   }
  // )

  createEffect(() => {
    if (updating.result) {
      setShowFooter(false)
    }
  })

  return (
    <div class="feature max-w-80ch relative p-8">
      <h1>Create Group</h1>

      <Show when={updating.error}>
        <FormErrorMessage error={updating.error} />
      </Show>

      <GroupForm class="max-w-60ch">
        <input type="hidden" name="id" value="userId" />

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

        <div class="mt-8 flex items-center justify-start gap-2">
          <label
            class="btn bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover normal-case"
            for="avatar"
          >
            Add Avatar
            <input
              accept=".jp,.jpeg,.png,.gif,.svg"
              id="avatar"
              name="avatar"
              onChange={() => setShowFooter(true)}
              type="file"
            />
          </label>
        </div>
      </GroupForm>

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
              <div aria-hidden="true" class="i-line-md:loading-twotone-loop" />
            </Show>
          </button>
        </FormFooter>
      </Show>

      <Show when={searchParams.debug}>
        <code class="mt-10 block">
          <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
        </code>
      </Show>
    </div>
  )
}
