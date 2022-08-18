import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import 'tailwindcss/tailwind.css'
import 'inter-ui/inter.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
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
          background-color: #ff0080;
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
