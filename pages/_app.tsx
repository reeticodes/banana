import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import 'tailwindcss/tailwind.css'
import 'inter-ui/inter.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </GeistProvider>
  )
}

export default MyApp
