import * as React from 'react'
import { useRouter } from 'next/router'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import 'tailwindcss/tailwind.css'
import 'inter-ui/inter.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      await fetch('/api/auth/callback', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      })
      if (event === 'SIGNED_IN') {
        router.push('/u/dashboard')
      } else if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })
    return () => authListener?.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <UserProvider supabaseClient={supabaseClient}>
          <Component {...pageProps} />
        </UserProvider>
      </GeistProvider>
      <style global jsx>{`
        * {
          box-sizing: border-box !important;
        }
        .canvas {
          background-color: #ff4800;
          background-image: radial-gradient(#e3e3e3 1px, transparent 0),
            radial-gradient(#e3e3e3 1px, transparent 0);
          background-position: 0 0, 25px 25px;
          background-size: 50px 50px;
        }
      `}</style>
    </>
  )
}

export default MyApp
