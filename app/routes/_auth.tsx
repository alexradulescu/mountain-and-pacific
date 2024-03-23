import { Outlet } from '@remix-run/react'

import { Header } from '~/functionality/shared/Header'

export const AuthLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default AuthLayout
