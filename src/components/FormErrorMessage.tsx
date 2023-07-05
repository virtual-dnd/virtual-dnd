import { type FormError } from 'solid-start'

export interface FormErrorProps {
  error: FormError
}

export function FormErrorMessage(props: FormErrorProps) {
  return (
    <div class="my-2 rounded-lg bg-danger-bg-100 fill-danger-text-100 p-2 px-4 text-danger-text-100">
      <p class="text-danger-text line-h-initial">
        Something went wrong: {props.error.message}
      </p>
    </div>
  )
}
