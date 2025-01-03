import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'

export type ConfirmationEmailTemplateProps = {
  user: any,
  event: any,
  confirmationLink: string;
}

export const eventConfirmationEmailSubject = 'Temu Kampus - Konfirmasi Kehadiran Acara'

export const eventConfirmationEmailTemplate = ({
  user,
  event,
  confirmationLink
}: ConfirmationEmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${eventConfirmationEmailSubject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <h1 style="color: #333; margin-bottom: 20px;">${eventConfirmationEmailSubject}</h1>
          </td>
        </tr>
        <tr>
          <td>
            <p style="font-size: 16px; color: #666;">
              Yth. ${user.name},
            </p>
            <p style="font-size: 16px; color: #666;">
              Anda telah diundang untuk menghadiri event berikut:
            </p>
            <table width="100%" style="background: #f0f0f0; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
              <tr>
                <td>
                  <h2 style="color: #333; margin-top: 0; margin-bottom: 10px;">${event.title}</h2>
                  <p style="font-size: 16px; color: #666; margin: 5px 0;">
                    <strong>Tanggal:</strong> 
                    ${formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone()) + ' - ' + formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())}
                  </p>
                  <p style="font-size: 16px; color: #666; margin: 5px 0;">
                    <strong>Lokasi:</strong> ${event.location.address}
                  </p>
                </td>
              </tr>
            </table>
            <p style="font-size: 16px; color: #666;">
              Mohon konfirmasi kehadiran Anda dengan menekan tombol di bawah ini:
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 30px 0;">
            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
                <td align="center" bgcolor="#007bff" style="border-radius: 4px;">
                  <a href="${confirmationLink}" target="_blank" style="padding: 12px 24px; font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block; border-radius: 4px;">
                    Konfirmasi Kehadiran
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <p style="font-size: 16px; color: #666;">
              Jika tombol di atas tidak berfungsi, Anda dapat menyalin dan menempelkan tautan berikut ke browser Anda:
            </p>
            <p style="font-size: 14px; color: #007bff; word-break: break-all;">
              ${confirmationLink}
            </p>
            <p style="font-size: 16px; color: #666;">
              Terima kasih atas perhatian Anda. Kami menantikan konfirmasi kehadiran Anda.
            </p>
            <p style="font-size: 16px; color: #666;">
              Salam hormat,<br />
              Tim Penyelenggara
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
