import userEvent from '@testing-library/user-event'

// @ts-expect-error - jest-dom is not typed
export * from '@testing-library/jest-dom/extend-expect'
export * from 'vitest'

export { userEvent }
