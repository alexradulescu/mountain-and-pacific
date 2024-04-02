import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useSessionStore } from '~/func/useSession'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }]
}

export default function Index() {
  const session = useSessionStore((state) => state.session)

  return (
    <main>
      <h1>{session ? <>Welcome back {session.user.email}</> : 'Hi there 👋'}</h1>

      <div>
        {session ? (
          <>
            <Link prefetch="intent" to="/account">
              <button>Account</button>
            </Link>
          </>
        ) : (
          <>
            <Link prefetch="intent" to="/login">
              <button>Login</button>
            </Link>
            <Link prefetch="intent" to="/register">
              <button>Register</button>
            </Link>
            <Link prefetch="intent" to="/forgot">
              <button>Forgot</button>
            </Link>
          </>
        )}
      </div>
      <br />

      <div>
        <Link prefetch="intent" to="/man">
          <button>Brainy</button>
        </Link>
        <Link prefetch="intent" to="/sdta">
          <button>SDTA</button>
        </Link>
        <Link prefetch="intent" to="/countries">
          <button>Countries</button>
        </Link>
        <Link prefetch="intent" to="/components">
          <button>Components</button>
        </Link>
        <Link prefetch="intent" to="/taxes">
          <button>Taxes</button>
        </Link>
      </div>

      <hr />
      <div>
        <a target="_blank" href="https://remix.run/future/spa-mode" rel="noreferrer">
          <button>SPA Mode Guide</button>
        </a>
        <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
          <button>Remix Docs</button>
        </a>
      </div>
    </main>
  )
}
