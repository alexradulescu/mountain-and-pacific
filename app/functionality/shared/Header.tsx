import { useMemo } from 'react'
import { Avatar, Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { Link } from '@remix-run/react'
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
    <Flex justify="between" align="center" height={'48px'}>
      <Button asChild variant="ghost">
        <Link to="/" prefetch="intent">
          Back
        </Link>
      </Button>
      {initials ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button radius="full" variant="ghost">
              <Avatar fallback={initials} radius="full" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item asChild>
              <Link to="/account" prefetch="intent">
                Account
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => supabase.auth.signOut()}>Log Out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login" prefetch="intent">
            Login
          </Link>
        </Button>
      )}
    </Flex>
  )
}
