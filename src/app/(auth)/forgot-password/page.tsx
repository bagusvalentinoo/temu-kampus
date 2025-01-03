import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import { FormForgotPassword } from '@/app/(auth)/forgot-password/form-forgot-password'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

const ForgotPasswordPage = () => {
  return (
    <>
      <AuthIllustration
        title="Lupa Kata Sandi?"
        subtitle="Jangan khawatir, kami akan membantu memulihkan akses akunmu."
        imageUrl="/images/page/auth/forgot-password/1.png"
        imageAlt="Forgot Password Illustration"
      />
      <CardWrapper
        headerLabel="Lupa Kata Sandi"
        headerDescription="Masukkan email Anda untuk mengatur ulang kata sandi"
        buttonBackLabel="Sudah ingat kata sandi Anda?"
        buttonBackLabelLink="Masuk di sini"
        buttonBackHref="/login"
      >
        <FormForgotPassword />
      </CardWrapper>
    </>
  )
}

export default ForgotPasswordPage
