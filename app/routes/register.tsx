import { Link } from '@remix-run/react'

export const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <Link to="/" prefetch="intent">
        Back
      </Link>
    </>
  )
}

export default Register
