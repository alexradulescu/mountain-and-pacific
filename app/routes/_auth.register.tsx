import { FormEvent, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { InputWithLabel } from '~/func/shared/InputWithLabel'
import { Button } from '~/ui/button'
import { Heading } from '~/ui/heading'
import { Stack } from 'styled-system/jsx'

import { supabase } from '~/utils/supabaseClient'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    mutate: mutateWithPassword,
    error: errorWithPassword,
    isPending: isPendingWithPassword
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          /** The redirect url embedded in the email link */
          emailRedirectTo: 'http://localhost:5173/'
        }
      })

      console.info(`mutateWithPassword`, { response })

      if (response.error) {
        throw new Error(response.error.message)
      }
      return response
    }
  })

  const handleRegisterWithPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutateWithPassword({ email, password })
  }

  return (
    <>
      <Heading size={'3xl'}>Register</Heading>
      {errorWithPassword ? <p>{errorWithPassword.message}</p> : null}
      <form onSubmit={handleRegisterWithPassword}>
        <Stack gap="4" marginBlock="4">
          <InputWithLabel
            label="Email"
            name="email"
            type="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputWithLabel
            label="Password"
            name="password"
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button type="submit" disabled={isPendingWithPassword}>
            Register with password
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default Register
