import { useMemo } from 'react'

import { css } from '@acab/ecsstatic'
import { Link } from '@remix-run/react'

import { supabase } from '~/utils/supabaseClient'

import { Stack } from '../../../styled-system/jsx'
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
    // <div className={HeaderWrapper}>
    <Stack alignItems="center" justify="space-between" gap="1" direction="row">
      <Link to="/" prefetch="intent">
        Back
      </Link>
      {initials ? (
        <div className={HStack}>
          <span>{initials}</span>

          <Link to="/account" prefetch="intent">
            Account
          </Link>

          <button onClick={() => supabase.auth.signOut()}>Log Out</button>
        </div>
      ) : (
        <Link to="/login" prefetch="intent">
          Login
        </Link>
      )}
    </Stack>
    // </div>
  )
}

const HeaderWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`

const HStack = css`
  display: flex;
  gap: 4px;
  align-items: center;
`
