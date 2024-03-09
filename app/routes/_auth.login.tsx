import { FormEvent, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

import { supabase } from '../utils/supabaseClient'

export const Login = () => {
  const { mutate, isError, isPending, data } = useMutation({
    mutationFn: (email: string) => {
      return supabase.auth.signInWithOtp({ email })
    }
  })

  useEffect(() => {
    console.info({ isError, isPending, data })
  }, [isError, isPending, data])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email')
    if (typeof email === 'string') {
      await mutate(email)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <button type="submit">Login with magic link</button>
      </form>
    </>
  )
}

export default Login
