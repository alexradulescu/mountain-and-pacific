import { FormEvent, MouseEvent, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '~/utils/supabaseClient'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const {
    mutate: mutateWithOtp,
    isPending: isPendingWithOtp,
    error: errorWithOtp
  } = useMutation({
    mutationFn: async (email: string) => {
      const response = await supabase.auth.signInWithOtp({
        email,
        options: {
          /** The redirect url embedded in the email link */
          emailRedirectTo: 'http://localhost:5173/'
        }
      })
      if (response.error) {
        throw new Error(response.error.message)
      }

      return response
    },
    onSuccess: (data) => {
      console.info(`onSuccess`, { data })
      navigate('/')
    }
  })

  const {
    mutate: mutateWithPassword,
    error: errorWithPassword,
    isPending: isPendingWithPassword
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.info(`mutateWithPassword`, { response })

      if (response.error) {
        throw new Error(response.error.message)
      }
      return response
    },
    onSuccess: (data) => {
      console.info(`onSuccess`, { data })
      navigate('/')
    }
  })

  const handleLoginWithOtp = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await mutateWithOtp(email)
  }

  const handleLoginWithPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutateWithPassword({ email, password })
  }

  return (
    <>
      <h1>Login</h1>
      {errorWithPassword ? <p>{errorWithPassword.message}</p> : null}
      {errorWithOtp ? <p>{errorWithOtp.message}</p> : null}
      <form onSubmit={handleLoginWithPassword}>
        <label>
          Email
          <input type="email" name="email" required onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" name="password" required onChange={(event) => setPassword(event.target.value)} />
        </label>

        <button type="submit" disabled={isPendingWithPassword}>
          Login with password
        </button>
        <br />
        <button type="button" onClick={handleLoginWithOtp} disabled={isPendingWithOtp}>
          Login with magic link
        </button>
      </form>
    </>
  )
}

export default Login
