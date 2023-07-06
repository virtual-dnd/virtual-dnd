import { createEffect, resetErrorBoundaries } from 'solid-js'
import { rollbar } from '~/lib/rollbar.ts'

export function ErrorMessage(props: { error: Error }) {
  createEffect(() => {
    if (import.meta.env.PROD) {
      rollbar.error(props.error)
    }
  })

  return (
    <div class="w-full bg-danger-surface-100 p-8 font-mono text-danger-text-200">
      <div class="mb-8 overflow-scroll">
        <p class="font-bold" id="error-message">
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
