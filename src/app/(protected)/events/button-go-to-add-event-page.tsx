'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const ButtonGoToAddEventPage = () => {
  const router = useRouter()

  const goToAddEventPage = () => {
    router.push('/events/add')
  }

  return (
    <>
      <Button onClick={goToAddEventPage}>Tambah Acara</Button>
    </>
  )
}

export default ButtonGoToAddEventPage
