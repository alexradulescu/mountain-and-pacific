import { Outlet } from '@remix-run/react'
import { Header } from '~/func/shared/Header'

export const AuthLayout = () => {
  return (
    <div className="soul">
      <Header />
      <Outlet />
    </div>
  )
}

export default AuthLayout
