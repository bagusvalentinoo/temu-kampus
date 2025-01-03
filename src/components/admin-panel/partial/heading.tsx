import H2 from '@/components/ui/h2'

type HeadingProps = {
  title: string
  subtitle: string
}

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div>
      <H2>{title}</H2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}