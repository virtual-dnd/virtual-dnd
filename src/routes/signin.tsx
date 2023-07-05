import { type Provider } from '@supabase/supabase-js'
import { For, Show } from 'solid-js'
import { createRouteAction } from 'solid-start'
import { BsDiscord, BsGoogle } from 'solid-icons/bs'
import { signInWithMagicLink, signInWithProvider } from '~/db/session.ts'
import { FormErrorMessage } from '~/components/index.ts'

export default function Signin() {
  const [submission, { Form }] = createRouteAction(async (form: FormData) => {
    signInWithMagicLink(form.get('email') as string)
    return 'magicLink'
  })

  const [, { Form: ProviderForm }] = createRouteAction(
    async (form: FormData) => {
      const intent = form.get('intent') as Provider
      return signInWithProvider(intent)
    }
  )

  const providerData = [
    {
      icon: <BsGoogle aria-hidden="true" />,
      id: 'google',
      name: 'Google',
    },
    {
      icon: <BsDiscord aria-hidden="true" />,
      id: 'discord',
      name: 'Discord',
    },
  ]

  return (
    <div class="min-h-screen p-4 sm:mx-auto sm:flex sm:max-w-3xl sm:flex-col sm:items-center sm:justify-center sm:p-8">
      <h1 class="font-display text-4xl text-neutral-text-400 sm:text-6xl">
        HELLO, FRIEND!
      </h1>
      <p class="pt-2 text-neutral-text-300 sm:pt-6">
        It's so good to see you. Use any of the methods below to sign in or
        magically create a new account.
      </p>

      <div class="mb-4 mt-4 w-full rounded-l bg-neutral-surface-200 px-2 py-6 sm:mt-8 sm:px-6">
        <Show when={submission.error}>
          <FormErrorMessage error={submission.error} />
        </Show>

        <Show when={submission.result === 'magicLink'} fallback={null}>
          <div class="text-text-inverse bg-success-background mb-2 rounded-lg p-2">
            <p>Check your email for a magic link!</p>
          </div>
        </Show>

        <Form class="mb-6 ">
          <label class="mb-1 block" html-for="email">
            Email (required)
          </label>
          <input type="hidden" name="intent" value="magicLink" />

          <div class="border-border mb-2 block w-full border">
            <input
              class="block w-full p-2"
              type="tel"
              id="email"
              name="email"
              placeholder="youremail@example.com"
              required
            />
          </div>
          <small class="text-text-100 mb-3 block text-xs">
            Enter your email to recieve a magic link.
          </small>

          <button
            class="mt-4 w-full rounded-full bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover sm:w-40"
            disabled={submission.pending}
            type="submit"
          >
            <Show when={submission.pending} fallback={'Sign in'}>
              ...sending
            </Show>
          </button>
        </Form>
      </div>

      <div class="flex flex-col items-center gap-2 bg-neutral-surface-200 px-2 py-6 sm:w-1/2 sm:px-6">
        <p class="mb-2">Or sign in with a provider</p>

        <For each={providerData}>
          {(provider) => (
            <ProviderForm class="w-full">
              <input type="hidden" name="intent" value={provider.id} />
              <button
                class="w-full rounded-full bg-action-bg-200 text-action-text-200 first-of-type:mb-2 hover:bg-action-bg-200-hover"
                disabled={submission.pending}
                type="submit"
              >
                {provider.icon}
                Sign in with {provider.name}
              </button>
            </ProviderForm>
          )}
        </For>
      </div>
    </div>
  )
}
