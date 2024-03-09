import { Link } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient(
  'https://obrfclyaqqqkficaacgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icmZjbHlhcXFxa2ZpY2FhY2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5NjgwMDIsImV4cCI6MjAyNTU0NDAwMn0.sj2WKM4ZUALUGgnskcOC9LD-w0rw3--Qj_w_pOUJ3Kc'
)

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
