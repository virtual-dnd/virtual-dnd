import { createServerAction$ } from 'solid-start/server'
import { signInWithMagicLink, signInWithProvider } from '~/db/session.ts'

export default function Signin() {
  // Might need to use this on the client...
  const [, { Form }] = createServerAction$(
    async (form: FormData, { request }) => {
      const intent = form.get('intent') as string

      switch (intent) {
        case 'magicLink':
          return signInWithMagicLink(form.get('email') as string)

        case 'discord':
        case 'google':
          return signInWithProvider(intent, request)

        default:
          throw new Error(
            `Unknown intent: ${intent}. This should never happen.`
          )
      }
    }
  )

  return (
    <div>
      <h1>Sign In</h1>

      <div>
        <Form>
          <label html-for="email">Email</label>
          <input type="hidden" name="intent" value="magicLink" />
          <input type="tel" id="email" name="email" />
          <button type="submit">Sign in</button>
        </Form>
      </div>

      <br />

      <div>
        <Form>
          <input type="hidden" name="intent" value="google" />
          <button type="submit">Sign in with Google</button>
        </Form>

        <br />

        <Form>
          <input type="hidden" name="intent" value="discord" />
          <button type="submit">Sign in with Discord</button>
        </Form>
      </div>
    </div>
  )
}
