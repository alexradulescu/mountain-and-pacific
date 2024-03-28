import { useMemo } from 'react'

import { Link } from '@remix-run/react'
import { Avatar } from '~/ui/avatar'
import { Button } from '~/ui/button'
import * as Menu from '~/ui/menu'
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { HStack } from 'styled-system/jsx'

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
    <HStack justify="space-between" gap="2">
      <Button asChild size={'xs'} variant={'subtle'}>
        <Link to="/" prefetch="intent">
          Back
        </Link>
      </Button>

      <div>
        {initials ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button borderRadius={'full'} variant={'link'}>
                <Avatar name={initials} />
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.ItemGroup id="group-1">
                  <Menu.ItemGroupLabel htmlFor="group-1">My Account</Menu.ItemGroupLabel>
                  <Menu.Separator />
                  <Menu.Item id="profile" asChild>
                    <Link to="/account" prefetch="intent">
                      <HStack gap="6" justify="space-between" flex="1">
                        <HStack gap="2">
                          <UserIcon />
                          Profile
                        </HStack>
                      </HStack>
                    </Link>
                  </Menu.Item>
                  <Menu.Item id="settings" asChild>
                    <Link to="/account" prefetch="intent">
                      <HStack gap="6" justify="space-between" flex="1">
                        <HStack gap="2">
                          <SettingsIcon /> Settings
                        </HStack>
                      </HStack>
                    </Link>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item id="logout" onClick={() => supabase.auth.signOut()}>
                    <HStack gap="2">
                      <LogOutIcon />
                      Logout
                    </HStack>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        ) : (
          <Button asChild size={'xs'} variant={'subtle'} colorPalette={'accent'}>
            <Link to="/login" prefetch="intent">
              Login
            </Link>
          </Button>
        )}
      </div>
    </HStack>
  )
}
