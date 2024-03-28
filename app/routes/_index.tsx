import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useSessionStore } from '~/func/useSession'
import { Button } from '~/ui/button'
import { Heading } from '~/ui/heading'
import { Container, Divider, HStack } from 'styled-system/jsx'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }]
}

export default function Index() {
  const session = useSessionStore((state) => state.session)

  return (
    <Container maxW={'3xl'}>
      <Heading size={['xl', '3xl']} marginBlock="5" fontWeight="400">
        {session ? <>Welcome back {session.user.email}</> : 'Hi there 👋'}
      </Heading>

      <HStack gap="3" marginBlock="3" flexWrap="wrap">
        {session ? (
          <>
            <Button variant="subtle" asChild colorPalette="accent">
              <Link prefetch="intent" to="/account">
                Account
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="subtle" colorPalette="sky" asChild>
              <Link prefetch="intent" to="/login">
                Login
              </Link>
            </Button>
            <Button variant="subtle" asChild>
              <Link prefetch="intent" to="/register">
                Register
              </Link>
            </Button>
            <Button variant="subtle" asChild>
              <Link prefetch="intent" to="/forgot">
                Forgot
              </Link>
            </Button>
          </>
        )}
      </HStack>

      <HStack gap="3" marginBlock="3" flexWrap="wrap">
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/countries">
            Countries
          </Link>
        </Button>
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/components">
            Components
          </Link>
        </Button>
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/taxes">
            Taxes
          </Link>
        </Button>
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/countries">
            Countries
          </Link>
        </Button>
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/components">
            Components
          </Link>
        </Button>
        <Button variant="subtle" asChild>
          <Link prefetch="intent" to="/taxes">
            Taxes
          </Link>
        </Button>
      </HStack>

      <Divider />
      <HStack gap="3" marginBlock="3">
        <Button variant="outline" asChild>
          <a target="_blank" href="https://remix.run/future/spa-mode" rel="noreferrer">
            SPA Mode Guide
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </Button>
      </HStack>
    </Container>
  )
}
