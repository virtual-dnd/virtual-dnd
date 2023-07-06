import { render } from '@solidjs/testing-library'
import Root from '../src/root.tsx'

describe('Root', () => {
  it('should render the app', () => {
    const { getByText } = render(() => <Root />)
    expect(getByText(/sign in/i)).toBeInTheDocument()
  })
})
