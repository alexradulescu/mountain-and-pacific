import { Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '~/func/useSession'

import { supabase } from '~/utils/supabaseClient'

const getCohorts = async (userId?: string) => {
  const { data: user_cohorts, error } = await supabase
    .from('user_cohorts')
    .select('*, cohorts (*)')
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

const getUserComments = async (userId?: string, deliverableId?: string) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('user_id', userId)
    .eq('deliverable_id', deliverableId)

  if (error) {
    throw new Error(error.message)
  }

  if (comments) {
    return comments
  }
}

const getAll = async (userId?: string) => {
  const { data: user_deliverables, error } = await supabase
    .from('user_deliverables')
    .select(
      `
      *,
      deliverables (
        *,
        comments (
          *
        )
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
  const { data: userComments } = useQuery({
    queryKey: ['userComments', session?.user.id],
    queryFn: ({ queryKey }) => getUserComments(queryKey[1], '2'),
    enabled: Boolean(session?.user.id)
  })
  const { data: all } = useQuery({
    queryKey: ['all', session?.user.id],
    queryFn: ({ queryKey }) => getAll(queryKey[1]),
    enabled: Boolean(session?.user.id)
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>SDTA</h1>
      <h2 key={userCohorts![0].cohort_id}>
        You are part of <u>{userCohorts ? userCohorts[0].cohorts.title : '🤔'}</u>
        {userCohorts ? (
          <small>
            <br />
            {userCohorts[0].cohorts.description}
          </small>
        ) : null}
      </h2>
      <hr />
      <h2>User deliverables (in the cohort)</h2>
      <ul>
        {userDeliverables?.map((deliverable) => (
          <li key={deliverable.id}>
            <Link to={`/sdta/${deliverable.id}`}>
              {deliverable.deliverables.title}
              <br />
              {deliverable.deliverables.description}
            </Link>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(userDeliverables, null, 2)}</pre>
      <hr />
      <h2>User deliverable comments (in the cohort)</h2>
      <pre>{JSON.stringify(userComments, null, 2)}</pre>
      <hr />
      <h2>All?</h2>
      <pre>{JSON.stringify(all, null, 2)}</pre>
    </>
  )
}

export default Sdta
