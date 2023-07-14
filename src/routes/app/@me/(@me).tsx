import { Show } from 'solid-js'
import { A, useRouteData, useSearchParams } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { getUserProfile } from '~/db/profiles.ts'
import { getUser } from '~/db/session.ts'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const { id } = await getUser(request)
    const profile = await getUserProfile(request)
    return {
      user: {
        id,
      },
      profile: profile.data ?? null,
    }
  })
}

export default function Me() {
  const data = useRouteData<typeof routeData>()
  const [searchParams] = useSearchParams()

  return (
    <>
      <h1 class="text-neutral-text-400">My Account</h1>

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
                  <div aria-hidden="true" class="i-octicon:person-24" />
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

        <A
          href="/app/@me/profile"
          class="decoration-none btn text-action-text-100 bg-action-link"
        >
          Edit User Profile
        </A>
      </div>

      <hr class="bg-neutral-border-300 h-2px my-8 w-full border-none" />

      <div>
        <h2 class="text-neutral-text-400">Danger Zone</h2>
        <p class="text-neutral-text-300">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        <a
          href="https://discord.com/channels/712718531783032843/1129182426455879861"
          class="decoration-none btn bg-danger-bg-100 text-danger-text-200 hover:bg-danger-bg-100-hover"
        >
          <div class="i-bxl:discord-alt text-2xl" />
          Contact Support
        </a>
      </div>

      <Show when={searchParams.debug}>
        <code class="mt-10 block">
          <pre>user: {JSON.stringify(data()?.user, null, 2)}</pre>
          <pre>profile: {JSON.stringify(data()?.profile, null, 2)}</pre>
        </code>
      </Show>
    </>
  )
}
