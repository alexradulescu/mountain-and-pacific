import { FormEvent, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useSessionStore } from '~/func/useSession'
import { toast } from 'sonner'

import { supabase } from '~/utils/supabaseClient'

export const Security = () => {
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
    },
    onSuccess: () => {
      toast.success('Your password has been successfully updated')
    },
    onError: (error) => {
      toast.error('There was an error & Your password has NOT been changed: ' + error.message)
    }
  })

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutate({ password })
  }

  return (
    <>
      <h2>Update your password</h2>
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
