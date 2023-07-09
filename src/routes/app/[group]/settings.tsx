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
import { deleteGroup, getGroup, updateGroup } from '~/db/groups.ts'
import { getUser } from '~/db/session.ts'

export function routeData({ params }: RouteDataArgs<{ group: string }>) {
  return createServerData$(
    async (groupId, { request }) => {
      const { user } = await getUser(request)
      const { group } = await getGroup(groupId, request)
      return {
        user,
        group,
      }
    },
    { key: () => params.group }
  )
}

export default function Settings() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
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

  createEffect(() => {
    if (updating.result) {
      setShowFooter('profile', false)
    }

    // if (updatingAvatar.result || removingAvatar.result) {
    //   setShowFooter('avatar', false)
    // }
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
                <Show when={updating?.pending} fallback={<>Delete Group</>}>
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
