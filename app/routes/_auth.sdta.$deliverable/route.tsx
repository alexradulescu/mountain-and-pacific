import { Link, useParams } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '~/func/useSession'

import { supabase } from '~/utils/supabaseClient'

const getUserDeliverables = async (userId?: string, deliverableId?: string) => {
  const { data: user_deliverables, error } = await supabase
    .from('user_deliverables')
    .select(
      `
      *,
      deliverables (
        *,
        comments (
          *,
          profiles (
            *
          )
        )
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
      <h1>
        SDTA: Deliverable{' '}
        <small>
          <Link to="/sdta"> back</Link>{' '}
        </small>
      </h1>
      <h2>{userDeliverableComments![0].deliverables.title}</h2>
      {userDeliverableComments![0].approved_by ? (
        <p>Approved by {userDeliverableComments![0].approved_by}</p>
      ) : (
        <p>Not approved yet</p>
      )}
      <ul>
        {userDeliverableComments![0].deliverables.comments.map((comment) => (
          <li key={comment.id}>
            <p>
              {comment.content}
              <br />
              <small>by {comment.profiles.username}</small>
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SdtaDetails
