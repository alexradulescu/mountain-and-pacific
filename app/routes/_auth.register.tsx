import { FormEvent, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { InputWithLabel } from '~/func/shared/InputWithLabel'

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
      <h1>Register</h1>
      {errorWithPassword ? <p>{errorWithPassword.message}</p> : null}
      <form onSubmit={handleRegisterWithPassword}>
        <InputWithLabel
          label="Email"
          name="email"
          type="email"
          required
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <InputWithLabel
          label="Password"
          name="password"
          type="password"
          required
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        <button type="submit" disabled={isPendingWithPassword}>
          Register with password
        </button>
      </form>
    </>
  )
}

export default Register
