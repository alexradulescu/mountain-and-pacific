import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export const InputWithLabel = (props: Props) => {
  const { label, ...restOfProps } = props

  return (
    <label>
      <span>{label}</span>
      <input {...restOfProps} />
    </label>
  )
}
