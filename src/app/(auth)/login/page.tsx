import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import { FormLogin } from '@/app/(auth)/login/form-login'

export const metadata: Metadata = {
  title: 'Sign In'
}

const LoginPage = () => {
  return (
    <>
      <AuthIllustration
        title="Selamat Datang Kembali di Temu Kampus!"
        subtitle="Masuk untuk menemukan dan mengelola acara kampus favoritmu."
        imageUrl="/images/page/auth/login/1.png"
        imageAlt="Login Illustration"
        imageWidthInVW={25}
      />
      <CardWrapper
        headerLabel="Selamat Datang Kembali!"
        headerDescription="Masuk ke akun Anda untuk melanjutkan"
        buttonBackLabel="Belum punya akun?"
        buttonBackLabelLink="Daftar di sini"
        buttonBackHref="/register"
      >
        <FormLogin />
      </CardWrapper>
    </>
  )
}

export default LoginPage
