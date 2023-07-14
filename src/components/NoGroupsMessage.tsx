import { A } from 'solid-start'

export function NoGroupsMessage() {
  return (
    <div class="flex flex-col items-center justify-center space-y-4">
      <div>
        <div class="i-line-md:emoji-frown-open-twotone text-neutral-text-300 text-9xl" />
      </div>

      <div class="text-neutral-text-300 text-2xl">
        You don't have any groups yet.
      </div>

      <div class="text-neutral-text-300">
        Create or join a group to get started.
      </div>

      <div>
        <A
          class="btn decoration-none bg-action-link text-action-text-100"
          href="/app/@me/groups/create"
        >
          Create Group
        </A>
      </div>
    </div>
  )
}
