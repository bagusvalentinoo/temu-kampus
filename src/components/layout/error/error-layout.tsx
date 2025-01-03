import styles from '@/components/layout/error/error-layout.module.css'

import H1 from '@/components/ui/h1'

type ErrorLayoutProps = {
  title?: string
  message?: string
}

export const ErrorLayout = ({
  title = 'Error',
  message = 'Terjadi kesalahan yang tidak terduga.'
}: ErrorLayoutProps) => {
  return (
    <main className={styles.fullScreenCenter}>
      <H1>{title}</H1>
      <p>{message}</p>
    </main>
  )
}
