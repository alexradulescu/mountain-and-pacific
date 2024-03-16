import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Navigate } from '@remix-run/react'
import { supabase } from '~/utils/supabaseClient'

import { Avatar } from './Avatar'
import { useSessionStore } from './useSession'

export const Account: FC = () => {
  const session = useSessionStore((state) => state.session)

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session!

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  if (!session) return <Navigate to="/" />

  async function updateProfile(
    event: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>,
    avatarUrl?: string | null
  ) {
    event.preventDefault()

    setLoading(true)
    const { user } = session!

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else if (avatarUrl) {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <Avatar
        url={avatarUrl}
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url)
        }}
      />
      <label>
        <span>Email</span>
        <input id="email" type="text" value={session.user.email} disabled />
      </label>
      <label>
        <span>Name</span>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        <span>Website</span>
        <input id="website" type="url" value={website || ''} onChange={(e) => setWebsite(e.target.value)} />
      </label>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}
