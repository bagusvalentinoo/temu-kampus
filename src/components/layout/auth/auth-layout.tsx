import type { ReactNode } from 'react'
import styles from '@/components/layout/auth/auth-layout.module.css'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={styles.fullScreenCenter}>
      <div className={styles.cardContainer}>{children}</div>
    </main>
  )
}
