import { Link } from '@remix-run/react'

export const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <Link to="/" prefetch="intent">
        Back
      </Link>
    </>
  )
}

export default Login
