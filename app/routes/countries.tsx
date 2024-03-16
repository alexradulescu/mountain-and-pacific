import { Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/utils/supabaseClient'

interface Country {
  name: string
}

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  return data as Array<Country>
}

export const Countries = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>Countries</h1>
      <Link to="/" prefetch="intent">
        Back
      </Link>
      <ul>
        {data?.map((country) => (
          <dl key={country.name}>
            <dt>{country.name}</dt>
            <dd>Some info</dd>
          </dl>
        ))}
      </ul>
    </>
  )
}

export default Countries
