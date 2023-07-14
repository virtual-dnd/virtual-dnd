import { For, Show, createMemo, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useRouteData, useSearchParams } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import { FormErrorMessage, FormFooter } from '~/components/index.ts'
import { getUserGroups } from '~/db/groups.ts'
import { getUserPlayers, updatePlayer } from '~/db/players.ts'
import { getUser } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const { id } = await getUser(request)
    const groups = await getUserGroups(id, request)
    const { players } = await getUserPlayers(id, request)

    return {
      groups: groups.data ?? [],
      players: players ?? [],
    }
  })
}

export default function GroupProfiles() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()
  const [showFooter, setShowFooter] = createStore({
    profile: false,
    avatar: false,
  })
  const [selectedGroup, setSelectedGroup] = createSignal<Group['id'] | null>(
    data()?.groups[0]?.id ?? null
  )
  const player = createMemo(() => {
    if (!selectedGroup()) return null
    return data()?.players.find((p) => p.group_id === selectedGroup())
  })

  const [updating, { Form: ProfileForm }] = createServerAction$(
    async (formData: FormData, { request }) => {
      await updatePlayer(
        {
          id: formData.get('id') as unknown as number,
          avatar: null,
          nickname: (formData.get('nickname') as string) ?? null,
          pronouns: (formData.get('pronouns') as string) ?? null,
        },
        request
      )
    }
  )

  return (
    <>
      <h1 class="text-neutral-text-400">Group Profiles</h1>
      <p class="text-neutral-text-300">
        Show who you are with different player profiles for each of your groups.
      </p>

      <Show when={updating.error}>
        <FormErrorMessage error={updating.error} />
      </Show>

      <label for="group" aria-describedby="group:help">
        Choose a group
        <select
          class="mt-2"
          id="group"
          onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
          name="group"
        >
          <For each={data()?.groups}>
            {(group) => <option value={group.id}>{group.name}</option>}
          </For>
        </select>
      </label>

      <hr class="bg-neutral-border-300 h-2px my-8 w-full border-none" />

      <ProfileForm>
        <input type="hidden" name="id" value={player()?.id ?? ''} />

        <label for="nickname" aria-describedby="nickname:help">
          Player Nickname (required)
          <input
            id="nickname"
            onKeyPress={() => setShowFooter('profile', true)}
            placeholder='e.g. "The Great and Powerful Oz"'
            maxlength={32}
            name="nickname"
            required
            type="text"
            value={player()?.nickname ?? ''}
          />
        </label>
        <small id="nickname:help">
          The name everyone in your group will see.
        </small>

        <label class="mt-4" for="pronouns" aria-describedby="pronouns:help">
          Pronouns
          <input
            id="pronouns"
            onKeyPress={() => setShowFooter('profile', true)}
            placeholder="Add your pronouns"
            name="pronouns"
            type="text"
            value={player()?.pronouns ?? ''}
          />
        </label>
        <small id="pronouns:help">The pronouns you identify with.</small>

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
      </ProfileForm>

      <Show when={searchParams.debug}>
        <code class="mt-10 block">
          <pre>groups: {JSON.stringify(data()?.groups, null, 2)}</pre>
          <pre>players: {JSON.stringify(data()?.players, null, 2)}</pre>
        </code>
      </Show>
    </>
  )
}
