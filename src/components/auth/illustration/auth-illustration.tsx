import Image from 'next/image'
import styles from '@/components/auth/illustration/auth-illustration.module.css'
import { Header } from '@/components/auth/illustration/header/header'
import { cn } from '@/lib/utils'

type AuthIllustrationProps = {
  title?: string
  subtitle?: string
  imageUrl: string
  imageAlt: string
  imageWidthInVW?: number
}

export const AuthIllustration = ({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  imageWidthInVW
}: AuthIllustrationProps) => {
  return (
    <div
      className={
        title && subtitle
          ? cn('lg:justify-between', styles.cardContainer)
          : cn('lg:justify-end', styles.cardContainer)
      }
    >
      {title && subtitle && <Header title={title} subtitle={subtitle} />}
      <div className={styles.centerRow}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={0}
          height={0}
          sizes={imageWidthInVW ? `${imageWidthInVW}vw` : '100vw'}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </div>
    </div>
  )
}
