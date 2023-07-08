import { A } from 'solid-start'

export default function Group() {
  return (
    <>
      <div class="side-bar relative">
        <div>Party banner</div>

        <nav>
          <ul>
            <li>
              <A activeClass="active-link" href="/app">
                Dashboard
              </A>
            </li>
            <li>
              <A activeClass="active-link" href="/app/encounters">
                Encounters
              </A>
            </li>
          </ul>
        </nav>

        <div class="left-0flex bg-surface-300 absolute bottom-0 left-0 right-0 w-full justify-between p-2">
          User settings for specific stuff
        </div>
      </div>

      <main class="feature relative">
        <header>App bar</header>

        <section>
          <h1>Dashboard</h1>
        </section>

        <footer class="border-surface-200 bg-surface-100 absolute bottom-0 left-0 right-0 h-20 border-t-4 p-4">
          Notes/discord
        </footer>
      </main>
    </>
  )
}
