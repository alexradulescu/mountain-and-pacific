import '@mantine/core/styles.css'
import './index.css'

import { ReactNode } from 'react'

import { createTheme, MantineProvider } from '@mantine/core'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { useSessionListener } from '~/func/useSession'
import { IconoirProvider } from 'iconoir-react'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()
const theme = createTheme({
  scale: 1.6
})

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <IconoirProvider
        iconProps={{
          strokeWidth: 1,
          width: '24px',
          height: '24px'
        }}
      >
        {children}
        <Toaster closeButton />
      </IconoirProvider>
    </MantineProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

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
        <main>
          <Providers>{children}</Providers>
        </main>

        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}

export default function App() {
  useSessionListener()

  return <Outlet />
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
