import './index.css'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { useSessionListener } from '~/func/useSession'
import { IconoirProvider } from 'iconoir-react'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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

export default function App() {
  useSessionListener()

  return (
    <IconoirProvider
      iconProps={{
        strokeWidth: 1,
        width: '24px',
        height: '24px'
      }}
    >
      <Outlet />
      <Toaster closeButton />
    </IconoirProvider>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
