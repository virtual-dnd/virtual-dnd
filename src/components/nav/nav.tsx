import { A } from 'solid-start'
import { Show } from 'solid-js'
import { Session } from '@auth/core/types'
import styles from './nav.module.css'

interface NavProps {
  session?: Session | null
}

export default function Nav(props: NavProps) {
  return (
    <header class={styles.header}>
      <nav class={styles.nav}>
        <A href="/">⚔️ Virtual DnD</A>

        <Show
          when={props.session}
          fallback={
            <A class="round" href="/signin">
              Sign In
            </A>
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
