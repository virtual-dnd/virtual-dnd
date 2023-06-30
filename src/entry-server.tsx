import {
  createHandler,
  renderAsync,
  StartServer,
} from 'solid-start/entry-server'
import { redirect } from 'solid-start/server'
import { getUserSession } from './db/session.ts'

const protectedRoute = () => '/app'

export default createHandler(
  ({ forward }) => {
    return async (event) => {
      const { pathname } = new URL(event.request.url)
      const isProtected = pathname.includes(protectedRoute())

      if (isProtected) {
        const { data } = await getUserSession(event.request)

        if (!data) {
          return redirect('/')
        }
      }

      return forward(event)
    }
  },

  renderAsync((event) => <StartServer event={event} />)
)
