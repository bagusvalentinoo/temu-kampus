import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@/components/providers/theme-provider'
import AdminPanelLayout from '@/components/layout/admin-panel/admin-panel-layout'
import { auth } from '@/lib/auth'

type ProtectedLayoutProps = {
  children: ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth()

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" reverseOrder={false} />
        <AdminPanelLayout role={session?.user?.role as string}>{children}</AdminPanelLayout>
      </ThemeProvider>
    </>
  )
}

export default ProtectedLayout