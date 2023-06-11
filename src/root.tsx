// @refresh reload
import { SessionProvider } from '@solid-auth/base/client'
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

import './root.css'

export default function Root() {
  return (
    <Html lang="en" data-theme={theme()}>
      <Head>
        <Link rel="stylesheet" href="/fonts/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@pluralsight/design-tokens@next/npm/normalize/normalize.css"
        />

        <Title>Virtual DnD</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body>
        <Suspense>
          <SessionProvider>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </SessionProvider>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
