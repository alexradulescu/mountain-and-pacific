import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useSessionStore } from '~/functionality/useSession'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }]
}

export default function Index() {
  const session = useSessionStore((state) => state.session)
  return (
    <>
      {session ? <h1>Welcome back {session.user.email}</h1> : <h1>Hi there 👋</h1>}

      <aside>
        <ul>
          {session ? (
            <>
              <li>
                <Link prefetch="intent" to="/account">
                  Account
                </Link>
              </li>
              <li>
                <Link prefetch="intent" to="/update-security">
                  Update Security
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link prefetch="intent" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link prefetch="intent" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link prefetch="intent" to="/forgot">
                  Forgot
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul>
          <li>
            <Link prefetch="intent" to="/countries">
              Countries
            </Link>
          </li>
          <li>
            <Link prefetch="intent" to="/components">
              Components
            </Link>
          </li>
          <li>
            <Link prefetch="intent" to="/taxes">
              Taxes
            </Link>
          </li>
        </ul>
      </aside>
      <ul>
        <li>
          <Link prefetch="intent" to="/countries">
            Countries
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="/components">
            Components
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="/taxes">
            Taxes
          </Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/future/spa-mode" rel="noreferrer">
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </>
  )
}
