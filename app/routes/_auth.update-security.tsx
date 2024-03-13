import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { useSessionStore } from '../functionality/useSessionStorage'
import { supabase } from '../utils/supabaseClient'

export const UpdateSecurity = () => {
  const session = useSessionStore((state) => state.session)

  const [password, setPassword] = useState<string>('')

  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      if (session && session.user.id) {
        const response = await supabase.auth.updateUser({ email: session.user.email, password })

        console.info(`mutateWithPassword`, { response })

        if (response.error) {
          throw new Error(response.error.message)
        }
        return response
      }
    }
  })

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutate({ password })
  }

  return (
    <>
      <h1>UpdateSecurity</h1>
      <form onSubmit={handleUpdatePassword}>
        <label>
          <span>Password</span>
          <input
            id="password"
            type="password"
            required
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isPending}>
          Update Password
        </button>
      </form>
    </>
  )
}

export default UpdateSecurity
