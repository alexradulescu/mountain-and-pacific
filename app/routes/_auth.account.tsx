import { Account } from '~/func/Account'
import { Security } from '~/func/UpdateSecurity'
import { Divider } from 'styled-system/jsx'

export const AccountPage = () => {
  return (
    <>
      <Account />
      <Divider marginBlock={'2'} />
      <Security />
    </>
  )
}

export default AccountPage
