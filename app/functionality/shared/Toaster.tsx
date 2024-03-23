import { createToaster } from '@ark-ui/react/toast'
import { IconButton } from '~/ui/icon-button'
import * as Toast from '~/ui/toast'
import { XIcon } from 'lucide-react'

export const [Toaster, toast] = createToaster({
  placement: 'bottom-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    )
  }
})
