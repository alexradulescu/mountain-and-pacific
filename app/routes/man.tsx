import { css } from '@acab/ecsstatic'
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from '@remix-run/react'
import { Brain, Closet } from 'iconoir-react'

export const Shell = () => {
  const [opened, { toggle }] = useDisclosure()

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
              <UnstyledButton className={ShellStyle}>Support</UnstyledButton>
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
        <UnstyledButton className={ShellStyle}>Support</UnstyledButton>
        <Link className={ShellStyle} to="/">
          <Closet />
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header on desktop are hidden on mobile in
        header and rendered in navbar instead.
      </AppShell.Main>
    </AppShell>
  )
}

export default Shell

const ShellStyle = css`
  display: block;
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
  font-weight: 500;

  @mixin hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  }
`
