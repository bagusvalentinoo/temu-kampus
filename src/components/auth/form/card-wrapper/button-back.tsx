import styles from '@/components/auth/form/card-wrapper/button-back.module.css'
import Link from 'next/link'

type ButtonBackProps = {
  label: string
  labelLink: string
  href: string
}

export const ButtonBack = ({ label, labelLink, href }: ButtonBackProps) => {
  return (
    <>
      <span className={styles.buttonBackText}>
        {label}
        <Link className={styles.buttonBackLink} href={href}>
          {labelLink}
        </Link>
      </span>
    </>
  )
}
