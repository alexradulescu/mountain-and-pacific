import { Divider } from 'styled-system/jsx'

import { Account } from '~/functionality/Account'
import { Security } from '~/functionality/UpdateSecurity'

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
