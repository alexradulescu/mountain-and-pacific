import { Session } from '@supabase/supabase-js'
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
