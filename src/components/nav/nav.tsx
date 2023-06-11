import { A } from 'solid-start'
import { Show } from 'solid-js'
import { signIn } from '@solid-auth/base/client'
import { Session } from '@auth/core/types'
import styles from './nav.module.css'

interface NavProps {
  session?: Session | null
}

export default function Nav(props: NavProps) {
  function handleSignIn() {
    signIn('google')
  }

  return (
    <header class={styles.header}>
      <nav class={styles.nav}>
        <A href="/">⚔️ Virtual DnD</A>

        <Show
          when={props.session}
          fallback={
            <button class="round" onClick={handleSignIn}>
              Sign In
            </button>
          }
        >
          <A class="round" href="/app">
            Open Virtual DnD
          </A>
        </Show>
      </nav>
    </header>
  )
}
