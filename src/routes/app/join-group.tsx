import { Show } from 'solid-js'
import { useRouteData, useSearchParams } from 'solid-start'
import {
  createServerAction$,
  createServerData$,
  redirect,
} from 'solid-start/server'
import { FormErrorMessage } from '~/components/index.ts'
import { getUser } from '~/db/session.ts'
import { getGroup } from '~/db/groups.ts'
import { createPlayer } from '~/db/players.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const { id } = await getUser(request)
    return {
      user: { id },
    }
  })
}

export default function JoinGroup() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()

  const [joining, { Form }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const id = formData.get('user_id') as string
      const invite = formData.get('invite') as string
      let groupId = ''

      if (invite.includes('https://virtualdnd.com/app/')) {
        groupId = invite.split('/').pop() || ''
      } else {
        groupId = invite
      }

      const { group } = await getGroup(groupId, request)
      await createPlayer(
        {
          admin: false,
          group_id: groupId,
          user_id: id,
        },
        request
      )

      return redirect(`/app/${group.id}`)
    }
  )

  return (
    <div class="w-screen">
      <div class="bg-neutral-surface-300 flex h-full w-full flex-col items-center justify-center p-4">
        <div class="bg-neutral-surface-100 max-w-80ch overflow-hidden rounded-md text-center shadow-xl">
          <header class="mb-2 pe-6 ps-6">
            <h2>Join a Group</h2>
            <p class="text-neutral-text-300">
              Enter an invite below to join an existing group.
            </p>
          </header>

          <Show when={joining.error}>
            <div class="pe-6 ps-6">
              <FormErrorMessage error={joining.error} />
            </div>
          </Show>

          <Form class="mt-4 text-left">
            <input type="hidden" name="user_id" value={data()?.user?.id} />

            <label class="pe-6 ps-6" for="invite">
              Invite (required)
              <input
                aria-describedby="invite:help"
                name="invite"
                placeholder="https://virtualdnd.com/app/8920"
                required
                type="text"
              />
            </label>

            <div id="invite:help" class="my-4 pe-6 ps-6 ">
              <small class="text-neutral-text-100 font-bold uppercase">
                Invites should look like
              </small>

              <ul class="mt-2">
                <li>8920</li>
                <li>https://virtualdnd.com/app/8920</li>
              </ul>
            </div>

            <footer class="bg-neutral-surface-300 p-4">
              <button
                class="bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover w-full"
                type="submit"
              >
                <Show when={joining.pending} fallback={<>Join Group</>}>
                  Joining
                  <div
                    aria-hidden="true"
                    class="i-line-md:loading-twotone-loop scale-150"
                  />
                </Show>
              </button>
            </footer>
          </Form>
        </div>

        <Show when={searchParams.debug}>
          <code class="h-33% mt-10 block overflow-auto">
            <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
          </code>
        </Show>
      </div>
    </div>
  )
}
