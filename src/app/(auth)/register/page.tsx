import type { Metadata } from 'next'
import { AuthIllustration } from '@/components/auth/illustration/auth-illustration'
import { CardWrapper } from '@/components/auth/form/card-wrapper/card-wrapper'
import { FormRegister } from '@/app/(auth)/register/form-register'

export const metadata: Metadata = {
  title: 'Sign Up'
}

const RegisterPage = () => {
  return (
    <>
      <AuthIllustration
        title="Bergabung dengan Temu Kampus Sekarang!"
        subtitle="Daftar sekarang dan akses berbagai acara menarik di kampusmu."
        imageUrl="/images/page/auth/register/1.png"
        imageAlt="Register Illustration"
      />
      <CardWrapper
        headerLabel="Buat Akun"
        headerDescription="Daftar untuk membuat akun"
        buttonBackLabel="Sudah punya akun?"
        buttonBackLabelLink="Masuk di sini"
        buttonBackHref="/login"
      >
        <FormRegister />
      </CardWrapper>
    </>
  )
}

export default RegisterPage
