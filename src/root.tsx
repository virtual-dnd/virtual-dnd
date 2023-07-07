// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'
import { theme } from './store/theme.ts'
import { ErrorMessage } from './components/ErrorMessage.tsx'

import 'virtual:uno.css'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import './root.css'

export default function Root() {
  return (
    <Html lang="en" class={theme()}>
      <Head>
        <Link rel="stylesheet" href="/fonts/dmvendor.css" />
        <Link rel="stylesheet" href="/fonts/styles.css" />

        <Title>Virtual DnD</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body>
        <Suspense>
          <ErrorBoundary fallback={(error) => <ErrorMessage error={error} />}>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
