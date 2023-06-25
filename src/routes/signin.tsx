import { Show } from 'solid-js'
import { createRouteAction } from 'solid-start'
import { signInWithMagicLink, signInWithProvider } from '~/db/session.ts'

export default function Signin() {
  const [submission, handleSubmission] = createRouteAction(async (e: Event) => {
    const target = e.target as HTMLFormElement
    const intent = target.intent.value

    e.preventDefault()

    switch (intent) {
      case 'magicLink':
        return signInWithMagicLink(target.email.value)

      default:
        return signInWithProvider(target.intent.value)
    }
  })

  return (
    <div class="min-h-screen p-6">
      <h1 class="font-display text-4xl text-text-inverse">WELCOME BACK!</h1>
      <p>It's so good to see you again.</p>

      <div class="mt-4 max-w-xl px-4 py-6">
        <Show when={submission.error}>
          <div class="mb-2 rounded-lg bg-danger-background p-2 text-text-100">
            <p>Something went wrong: {submission.error.message}</p>
          </div>
        </Show>

        <Show when={submission.input} fallback={null}>
          <div class="mb-2 rounded-lg bg-success-background p-2 text-text-inverse">
            <p>Check your email for a magic link!</p>
          </div>
        </Show>

        <form onSubmit={handleSubmission} class="mb-6">
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
          <small class="mb-3 block text-xs">
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
        </form>
      </div>

      <div class="max-w-xl rounded-md bg-surface-inverse p-4">
        <p class="mb-4">Or sign in with a provider</p>

        <form onSubmit={handleSubmission}>
          <input type="hidden" name="intent" value="google" />
          <button
            class="action-secondary-btn"
            disabled={submission.pending}
            type="submit"
          >
            Sign in with Google
          </button>
        </form>

        <form onSubmit={handleSubmission}>
          <input type="hidden" name="intent" value="discord" />
          <button
            class="action-secondary-btn"
            disabled={submission.pending}
            type="submit"
          >
            Sign in with Discord
          </button>
        </form>
      </div>
    </div>
  )
}
