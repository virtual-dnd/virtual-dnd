import { type Provider } from '@supabase/supabase-js'
import { For, Show } from 'solid-js'
import { createRouteAction } from 'solid-start'
import { object, string } from 'yup'
import { signInWithMagicLink, signInWithProvider } from '~/db/session.ts'

export default function Signin() {
  const [submission, { Form }] = createRouteAction(async (form: FormData) => {
    const magicLinkSchema = object({
      email: string().email().required(),
    })

    try {
      await magicLinkSchema.validate({ email: form.get('email') })
    } catch (error: Error | unknown) {
      throw new Error('A valid email is required.')
    }

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
      icon: <div aria-hidden="true" class="i-bxl:google text-2xl" />,
      id: 'google',
      name: 'Google',
    },
    {
      icon: <div aria-hidden="true" class="i-bxl:discord-alt text-2xl" />,
      id: 'discord',
      name: 'Discord',
    },
  ]

  return (
    <div class="min-h-screen p-4 sm:mx-auto sm:flex sm:max-w-3xl sm:flex-col sm:items-center sm:justify-center sm:p-8">
      <h1 class="font-display text-neutral-text-400 text-4xl sm:text-6xl">
        HELLO, FRIEND!
      </h1>
      <p class="text-neutral-text-300 pt-2 sm:pt-6">
        It's so good to see you. Use any of the methods below to sign in or
        magically create a new account.
      </p>

      <div class="bg-neutral-surface-200 mb-4 mt-4 w-full rounded-l px-2 py-6 sm:mt-8 sm:px-6">
        <Show when={submission.result === 'magicLink'} fallback={null}>
          <div class="bg-success-surface-100 mb-4 rounded-lg">
            <p class="text-success-text-200 px-4 py-2">
              Check your email for a magic link!
            </p>
          </div>
        </Show>

        <Form class="mb-6 ">
          <label class="mb-1 block" for="email">
            Email (required)
            <input type="hidden" name="intent" value="magicLink" />
            <input
              aria-invalid={submission.error ? 'true' : 'false'}
              class="block w-full p-2"
              type="email"
              id="email"
              name="email"
              placeholder="youremail@example.com"
              required
            />
          </label>

          <small class="text-neutral-text-100 mb-3 block text-xs">
            <Show
              when={submission.error}
              fallback={'Enter your email to recieve a magic link.'}
            >
              Please enter a valid email.
            </Show>
          </small>

          <button
            class="bg-action-bg-100 text-action-text-100 hover:bg-action-bg-100-hover mt-4 w-full rounded-full sm:w-40"
            disabled={submission.pending}
            type="submit"
          >
            <Show when={submission.pending} fallback={'Sign in'}>
              Sending
              <div
                aria-hidden="true"
                class="i-line-md:loading-twotone-loop scale-160"
              />
            </Show>
          </button>
        </Form>
      </div>

      <div class="bg-neutral-surface-200 flex flex-col items-center gap-2 px-2 py-6 sm:w-1/2 sm:px-6">
        <p class="mb-2">Or sign in with a provider</p>

        <For each={providerData}>
          {(provider) => (
            <ProviderForm class="w-full">
              <input type="hidden" name="intent" value={provider.id} />
              <button
                class="bg-action-bg-200 text-action-text-200 hover:bg-action-bg-200-hover w-full rounded-full first-of-type:mb-2"
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
