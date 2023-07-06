import { ParentProps } from 'solid-js'

export function FormFooter(props: ParentProps) {
  return (
    <div class="align-center shadow-m absolute bottom-4 left-0 mx-2 flex w-[95%] flex-1 animate-bounce-in-from-bottom items-center justify-between rounded-md bg-neutral-surface-400 px-4 py-2">
      <p>Careful -- you have unsaved changes!</p>

      <div class="align-center flex grow justify-center gap-2 px-2">
        {props.children}
      </div>
    </div>
  )
}
