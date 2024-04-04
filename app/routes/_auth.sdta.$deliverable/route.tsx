import { Link, useParams } from '@remix-run/react'
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
const getUserDeliverables = async (userId?: string, deliverableId?: string) => {
  const { data: user_deliverables, error } = await supabase
    .from('user_deliverables')
    .select(
      `
      *,
      deliverables (
        *,
        comments (*)
      )
    `
    )
    .eq('user_id', userId)
    .eq('deliverable_id', deliverableId)

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

export const SdtaDetails = () => {
  const session = useSessionStore((state) => state.session)
  const { deliverable } = useParams()

  const {
    data: userDeliverableComments,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['getUserDeliverables', session?.user.id],
    queryFn: ({ queryKey }) => getUserDeliverables(queryKey[1], deliverable),
    enabled: Boolean(session?.user.id) && Boolean(deliverable)
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>SDTA: Deliverabled</h1>

      <pre>{JSON.stringify(userDeliverableComments, null, 2)}</pre>
    </>
  )
}

export default SdtaDetails
