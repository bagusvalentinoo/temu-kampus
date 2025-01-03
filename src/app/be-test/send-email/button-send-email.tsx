'use client'

import { Button } from '@/components/ui/button'
import { sendEmailEventReminder } from '@/actions/email.action'

export const ButtonSendEmail = () => {
  const sendEmailData = async () => {
    await sendEmailEventReminder({
      to: 'sultan.majid213@gmail.com'
    })
  }

  return (
    <form action={sendEmailData}>
      <Button type="submit">Send Email</Button>
    </form>
  )
}
