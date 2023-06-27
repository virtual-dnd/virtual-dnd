import { type Provider } from '@supabase/supabase-js'
import { Show } from 'solid-js'
import { createRouteAction } from 'solid-start'
import { signInWithMagicLink, signInWithProvider } from '~/db/session.ts'

export default function Signin() {
  const [submission, { Form }] = createRouteAction(async (form: FormData) => {
    const intent = form.get('intent')

    if (intent === 'magicLink') {
      signInWithMagicLink(form.get('email') as string)
      return 'magicLink'
    } else {
      return signInWithProvider(intent as Provider)
    }
  })

  return (
    <div class="min-h-screen p-6">
      <h1 class="font-display text-4xl text-text-200">WELCOME BACK!</h1>
      <p>It's so good to see you again.</p>

      <div class="mt-4 max-w-xl px-4 py-6">
        <Show when={submission.error}>
          <div class="mb-2 rounded-lg bg-danger-background p-2 text-text-100">
            <p>Something went wrong: {submission.error.message}</p>
          </div>
        </Show>

        <Show when={submission.result === 'magicLink'} fallback={null}>
          <div class="mb-2 rounded-lg bg-success-background p-2 text-text-inverse">
            <p>Check your email for a magic link!</p>
          </div>
        </Show>

        <Form class="mb-6">
          <label class="mb-1 block" html-for="email">
            Email (required)
          </label>
          <input type="hidden" name="intent" value="magicLink" />

          <div class="mb-2 block w-full border border-border">
            <input
              class="block w-full p-2"
              type="tel"
              id="email"
              name="email"
              placeholder="youremail@example.com"
              required
            />
          </div>
          <small class="mb-3 block text-xs text-text-100">
            Enter your email to recieve a magic link.
          </small>

          <button
            class="action-btn"
            disabled={submission.pending}
            type="submit"
          >
            <Show when={submission.pending} fallback={'Sign in'}>
              ...sending
            </Show>
          </button>
        </Form>
      </div>

      <div class="max-w-xl rounded-md bg-surface-200 p-4">
        <p class="mb-4">Or sign in with a provider</p>

        <Form>
          <input type="hidden" name="intent" value="google" />
          <button
            class="action-secondary-btn"
            disabled={submission.pending}
            type="submit"
          >
            Sign in with Google
          </button>
        </Form>

        <Form>
          <input type="hidden" name="intent" value="discord" />
          <button
            class="action-secondary-btn"
            disabled={submission.pending}
            type="submit"
          >
            Sign in with Discord
          </button>
        </Form>
      </div>
    </div>
  )
}
