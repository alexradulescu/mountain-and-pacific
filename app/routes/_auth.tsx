import { Link, Outlet } from '@remix-run/react'

export const AuthLayout = () => {
  return (
    <>
      <Link to="/" prefetch="intent">
        Back
      </Link>
      <Outlet />
    </>
  )
}

export default AuthLayout
