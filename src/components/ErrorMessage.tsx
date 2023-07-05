import { createEffect, resetErrorBoundaries } from 'solid-js'
import { rollbar } from '~/lib/rollbar.ts'

export function ErrorMessage(props: { error: Error }) {
  createEffect(() => rollbar.error(props.error))

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          'background-color': 'rgba(252, 165, 165)',
          color: 'rgb(153, 27, 27)',
          'border-radius': '5px',
          overflow: 'scroll',
          padding: '16px',
          'margin-bottom': '8px',
        }}
      >
        <p style={{ 'font-weight': 'bold' }} id="error-message">
          {props.error.message}
        </p>

        <button
          id="reset-errors"
          onClick={resetErrorBoundaries}
          style={{
            color: 'rgba(252, 165, 165)',
            'background-color': 'rgb(153, 27, 27)',
            'border-radius': '5px',
            padding: '4px 8px',
          }}
        >
          Clear errors and retry
        </button>

        <pre style={{ 'margin-top': '8px', width: '100%' }}>
          {props.error.stack}
        </pre>
      </div>
    </div>
  )
}
