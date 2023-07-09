import { ParentProps } from 'solid-js'

interface FormFooterProps {
  onCancel: () => void
}

export function FormFooter(props: ParentProps<FormFooterProps>) {
  return (
    <div class="animated animated-bounce-in-up align-center shadow-m bg-neutral-surface-400 absolute bottom-4 left-0 mx-2 flex w-[95%] flex-1 items-center justify-between rounded-md px-4 py-2">
      <p>Careful -- you have unsaved changes!</p>

      <div class="align-center flex grow justify-center gap-2 px-2">
        <button
          class="text-action-bg-100 hover:text-action-text-inverse w-full  border-0"
          onClick={() => props.onCancel()}
          type="button"
        >
          Cancel
        </button>

        {props.children}
      </div>
    </div>
  )
}
