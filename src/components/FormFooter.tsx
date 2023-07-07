import { ParentProps } from 'solid-js'

export function FormFooter(props: ParentProps) {
  return (
    <div class="animated animated-bounce-in-up align-center shadow-m bg-neutral-surface-400 absolute bottom-4 left-0 mx-2 flex w-[95%] flex-1 items-center justify-between rounded-md px-4 py-2">
      <p>Careful -- you have unsaved changes!</p>

      <div class="align-center flex grow justify-center gap-2 px-2">
        {props.children}
      </div>
    </div>
  )
}
