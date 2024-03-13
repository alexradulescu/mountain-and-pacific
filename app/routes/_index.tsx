import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }]
}

export default function Index() {
  return (
    <>
      <h1>Welcome to Remix (SPA Mode)</h1>
      <ul>
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
