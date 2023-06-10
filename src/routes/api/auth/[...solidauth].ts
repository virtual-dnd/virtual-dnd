import { SolidAuth } from '@solid-auth/base'
import { authOptions } from '~/server/auth.ts'

export const { GET, POST } = SolidAuth(authOptions)
