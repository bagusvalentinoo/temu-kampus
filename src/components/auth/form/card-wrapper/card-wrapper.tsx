import styles from '@/components/auth/form/card-wrapper/card-wrapper.module.css'
import type { ReactNode } from 'react'
import { ButtonBack } from '@/components/auth/form/card-wrapper/button-back'

type CardWrapperProps = {
  children: ReactNode
  headerLabel: string
  headerDescription: string
  buttonBackLabel?: string
  buttonBackLabelLink?: string
  buttonBackHref?: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  buttonBackLabel,
  buttonBackLabelLink,
  buttonBackHref
}: CardWrapperProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLogo}>TM</div>
        <h1 className={styles.cardTitle}>Temu Kampus</h1>
      </div>
      <div className={styles.textCenter}>
        <h1 className={styles.cardSubtitle}>{headerLabel}</h1>
        <span className={styles.cardDescription}>{headerDescription}</span>
      </div>
      <div className={styles.cardContent}>{children}</div>
      {buttonBackLabel && buttonBackLabelLink && buttonBackHref && (
        <ButtonBack
          label={buttonBackLabel}
          labelLink={buttonBackLabelLink}
          href={buttonBackHref}
        />
      )}
    </div>
  )
}
