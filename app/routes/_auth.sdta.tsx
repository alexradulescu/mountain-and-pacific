import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '~/func/useSession'

import { supabase } from '~/utils/supabaseClient'

const getCohorts = async (userId?: string) => {
  const { data: user_cohorts, error } = await supabase
    .from('user_cohorts')
    .select('id,user_id,cohort_id')
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }

  if (user_cohorts) {
    return user_cohorts
  }
}
const getUserDeliverables = async (userId?: string) => {
  const { data: user_deliverables, error } = await supabase
    .from('user_deliverables')
    .select(
      `
      *,
      deliverables (
        *
      )
    `
    )
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }

  if (user_deliverables) {
    return user_deliverables
  }
}

const getUserCohortDeliverables = async (userId?: string) => {
  const { data: user_deliverables, error } = await supabase
    .from('user_cohorts')
    .select(
      `
      *,
      cohort_deliverables (
        *,
        comments (
          *,
          
        )
      )
    `
    )
    .eq('user_id', userId)
  // .eq('cohort_id', 'cohort_id')

  if (error) {
    throw new Error(error.message)
  }

  if (user_deliverables) {
    return user_deliverables
  }
}

export const Sdta = () => {
  const session = useSessionStore((state) => state.session)

  const {
    data: userCohorts,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['userCohorts', session?.user.id],
    queryFn: ({ queryKey }) => getCohorts(queryKey[1]),
    enabled: Boolean(session?.user.id)
  })
  const { data: userDeliverables } = useQuery({
    queryKey: ['userDeliverables', session?.user.id],
    queryFn: ({ queryKey }) => getUserDeliverables(queryKey[1]),
    enabled: Boolean(session?.user.id)
  })
  const { data: userCohortDeliverables } = useQuery({
    queryKey: ['userDeliverables', session?.user.id],
    queryFn: ({ queryKey }) => getUserCohortDeliverables(queryKey[1]),
    enabled: Boolean(session?.user.id)
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>SDTA</h1>
      <h2>User: </h2>
      <h2>User cohort</h2>
      <pre>{JSON.stringify(userCohorts, null, 2)}</pre>
      <h2>User deliverables (in the cohort)</h2>
      <pre>{JSON.stringify(userDeliverables, null, 2)}</pre>
      <h2>User cohort deliverables (in the cohort)</h2>
      <pre>{JSON.stringify(userCohortDeliverables, null, 2)}</pre>
      <h2>Comments in user deliverables</h2>
    </>
  )
}

export default Sdta
