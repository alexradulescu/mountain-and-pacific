import { useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/utils/supabaseClient'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface SessionState {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const useSessionStore = create<SessionState>()(
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

export const useSessionListener = () => {
  const setSession = useSessionStore((state) => state.setSession)
  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: () => {
      return supabase.auth.getSession()
    }
  })

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  useEffect(() => {
    if (data?.data) {
      setSession(data?.data?.session)
    }
  }, [data, setSession])
}
