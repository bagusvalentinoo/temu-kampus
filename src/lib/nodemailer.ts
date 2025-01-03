import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

export const sendEmail = async (
  { to, subject, html }: { to: string, subject: string, html: any }
) => {
  await transporter.sendMail({
    from: process.env?.MAIN_EMAIL || '',
    to,
    subject,
    html
  })
}
