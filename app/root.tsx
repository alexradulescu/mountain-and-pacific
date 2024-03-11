import './index.css'

import { useEffect } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Session } from '@supabase/supabase-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { supabase } from './utils/supabaseClient'

const queryClient = new QueryClient()

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <main>{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}

interface SessionState {
  session: Session | null
  setSession: (session: Session | null) => void
}

const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        session: null,
        setSession: (session) => set(() => ({ session }))
      }),
      {
        name: 'session'
      }
    )
  )
)

export default function App() {
  const session = useSessionStore((state) => state.session)
  const setSession = useSessionStore((state) => state.setSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  return (
    <>
      {session ? <h4>Logged in: {session.user.email}</h4> : <h4>Anon</h4>}
      <Outlet />
    </>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
