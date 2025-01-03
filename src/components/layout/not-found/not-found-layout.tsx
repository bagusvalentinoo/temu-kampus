import styles from '@/components/layout/not-found/not-found-layout.module.css'
import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import Link from 'next/link'

type NotFoundLayoutProps = {
  title: string
  description: string
  buttonTitle?: string
  buttonHref?: string
}

export const NotFoundLayout = ({
  title,
  description,
  buttonTitle = 'Kembali ke Beranda',
  buttonHref = '/'
}: NotFoundLayoutProps) => {
  return (
    <main className={styles.fullScreenCenter}>
      <H1>{title}</H1>
      <p>{description}</p>
      {buttonTitle && buttonHref && (
        <Button type="button" size="lg">
          <Link href={buttonHref}>{buttonTitle}</Link>
        </Button>
      )}
    </main>
  )
}
