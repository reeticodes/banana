import { GeistProvider, CssBaseline } from '@geist-ui/core'
import 'tailwindcss/tailwind.css'
import 'inter-ui/inter.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default MyApp
