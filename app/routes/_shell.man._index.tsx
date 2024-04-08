import { Button, Group, Stack } from '@mantine/core'
import { Link } from '@remix-run/react'
import { Brain, EmojiThinkLeft, GridPlus, LogIn, LogOut, MoneySquare, PlusSquare, User } from 'iconoir-react'

import { useSessionStore } from '~/func/useSession'

const anonLinks = [
  { title: 'Login', icon: LogIn, color: 'red', to: '/login' },
  { title: 'Register', icon: PlusSquare, color: 'red', to: '/register' },
  { title: 'Forgot', icon: EmojiThinkLeft, color: 'red', to: '/forgot' }
]

const authLinks = [
  { title: 'Account', icon: User, color: 'red', to: '/account' },
  { title: 'Logout', icon: LogOut, color: 'red', to: '/logout' }
]

const allLinks = [
  { title: 'SDTA', icon: Brain, color: 'red', to: '/sdta' },
  { title: 'Taxes', icon: MoneySquare, color: 'red', to: '/man/taxes' },
  { title: 'Components', icon: GridPlus, color: 'red', to: '/components' }
]

export const Man = () => {
  const session = useSessionStore((state) => state.session)

  return (
    <Stack gap="sm">
      <Group gap="sm">
        {allLinks.map((link) => (
          <Button
            component={Link}
            to={link.to}
            key={link.title}
            leftSection={<link.icon width={16} fontWeight={500} />}
            variant="light"
          >
            {link.title}
          </Button>
        ))}
      </Group>
      {session?.user ? (
        <Group gap="sm">
          {authLinks.map((link) => (
            <Button
              component={Link}
              to={link.to}
              key={link.title}
              leftSection={<link.icon width={16} fontWeight={'500'} />}
              variant="light"
              color="blue"
            >
              {link.title}
            </Button>
          ))}
        </Group>
      ) : (
        <Group gap="sm">
          {anonLinks.map((link) => (
            <Button
              component={Link}
              to={link.to}
              key={link.title}
              leftSection={<link.icon width={16} fontWeight={'500'} />}
              variant="light"
              color="grape"
            >
              {link.title}
            </Button>
          ))}
        </Group>
      )}
    </Stack>
  )
}

export default Man
