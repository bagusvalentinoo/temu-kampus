import styles from '@/components/auth/illustration/header/header.module.css'

type HeaderProps = {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  )
}
