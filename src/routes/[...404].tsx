import { Title } from 'solid-start'
import { HttpStatusCode } from 'solid-start/server'

export default function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>

      <p>
        <a href="/">Return to the homepage</a>
      </p>
    </main>
  )
}
