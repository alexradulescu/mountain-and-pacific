import { Link } from '@remix-run/react'

export const Forgot = () => {
  return (
    <>
      <h1>Forgot</h1>
      <Link to="/" prefetch="intent">
        Back
      </Link>
    </>
  )
}

export default Forgot
