import { useMemo } from 'react'

import { css } from '@acab/ecsstatic'
import { Link } from '@remix-run/react'
import { LogOut, UserCircle } from 'iconoir-react'

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

      <div>
        {initials ? (
          <>
            <span>{initials}</span>
            <Link to="/account" prefetch="intent">
              <button>
                <UserCircle width={24} />
              </button>
            </Link>
            <button onClick={() => supabase.auth.signOut()}>
              <LogOut width={24} />
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
  gap: 1rem;
`
