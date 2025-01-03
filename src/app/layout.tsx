import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Temu Kampus',
    absolute: 'Temu Kampus'
  },
  description: 'Temu Kampus is a platform management events in campus'
}

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

const RootLayout = ({
  children
}: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
