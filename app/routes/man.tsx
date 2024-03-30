import { css } from '@acab/ecsstatic'
import { AppShell, Burger, Group, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from '@remix-run/react'
import { CardsGrid } from '~/func/CardsGrid'
import { Brain, Closet, HalfMoon, SunLight } from 'iconoir-react'

export const Shell = () => {
  const [opened, { toggle }] = useDisclosure()
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Brain />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={ShellStyle}>Home</UnstyledButton>
              <UnstyledButton className={ShellStyle}>Blog</UnstyledButton>
              <UnstyledButton className={ShellStyle}>Contacts</UnstyledButton>
              <UnstyledButton className={ShellStyle} onClick={() => toggleColorScheme()}>
                {colorScheme === 'light' ? <SunLight /> : <HalfMoon />}
              </UnstyledButton>
              <Link className={ShellStyle} to="/">
                <Closet />
              </Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={ShellStyle}>Home</UnstyledButton>
        <UnstyledButton className={ShellStyle}>Blog</UnstyledButton>
        <UnstyledButton className={ShellStyle}>Contacts</UnstyledButton>
        <UnstyledButton className={ShellStyle} onClick={() => toggleColorScheme()}>
          {colorScheme === 'light' ? <SunLight /> : <HalfMoon />} Toggle
        </UnstyledButton>
        <Link className={ShellStyle} to="/">
          <Closet /> Exit
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        <CardsGrid />
      </AppShell.Main>
    </AppShell>
  )
}

export default Shell

const ShellStyle = css`
  display: flex;
  align-items: center;
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
  font-weight: 500;

  @mixin hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  }

  &a {
    text-decoration: none;
  }
`
