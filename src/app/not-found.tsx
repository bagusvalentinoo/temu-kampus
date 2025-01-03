import type { Metadata } from 'next'
import { NotFoundLayout } from '@/components/layout/not-found/not-found-layout'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Not Found'
}

const NotFound = async () => {
  const session = await auth()

  return (
    <NotFoundLayout
      title="Halaman Tidak Ditemukan"
      description="Maaf, halaman yang Anda cari tidak tersedia."
      buttonTitle="Kembali ke Beranda"
      buttonHref={session ? '/dashboard' : '/login'}
    />
  )
}

export default NotFound
