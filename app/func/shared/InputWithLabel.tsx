import { FormLabel } from '~/ui/form-label'
import { Input, type InputProps } from '~/ui/input'
import { Stack } from 'styled-system/jsx'

interface Props extends InputProps {
  label: string
}

export const InputWithLabel = (props: Props) => {
  const { label, name, ...restOfProps } = props

  return (
    <Stack gap="1" width="full">
      <FormLabel fontSize={'md'} fontWeight={'400'} htmlFor={name}>
        {label}
      </FormLabel>
      <Input id={name} {...restOfProps} />
    </Stack>
  )
}
