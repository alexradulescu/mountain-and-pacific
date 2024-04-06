import { useMemo } from 'react'

import { css } from '@acab/ecsstatic'
import { Link } from '@remix-run/react'
import { LogOut, User } from 'iconoir-react'

import { supabase } from '~/utils/supabaseClient'

import { useSessionStore } from '../useSession'

export const Header = () => {
  const session = useSessionStore((state) => state.session)

  const initials = useMemo(() => {
    if (session && session.user) {
      const name = session.user.email?.split('@')[0]
      return name ? name.slice(0, 2).toUpperCase() : '??'
    } else return null
  }, [session])

  return (
    <div className={HStack} data-mb="1">
      <Link to="/" prefetch="intent">
        <button>Back</button>
      </Link>

      <div className={HStack}>
        {initials ? (
          <>
            <span>{initials}</span>
            <Link to="/account" prefetch="intent">
              <button>
                <User />
              </button>
            </Link>
            <button onClick={() => supabase.auth.signOut()}>
              <LogOut />
            </button>
          </>
        ) : (
          <Link to="/login" prefetch="intent">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  )
}

const HStack = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0;
`
