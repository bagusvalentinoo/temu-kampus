import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'

export type EventReminderEmailTemplateProps = {
  user: any
  event: any
}

export const eventReminderEmailSubject = 'Temu Kampus - Pengingat Acara'

export const eventReminderEmailTemplate = ({ user, event }: EventReminderEmailTemplateProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${eventReminderEmailSubject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">${eventReminderEmailSubject}</h1>
      <p style="font-size: 16px; color: #666;">
        Halo ${user.name},
      </p>
      <p style="font-size: 16px; color: #666;">
        Ini adalah pengingat bahwa acara yang kamu ikuti akan segera berlangsung:
      </p>
      <div style="background: #f0f0f0; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0; margin-bottom: 10px;">${event.title}</h2>
        <p style="font-size: 16px; color: #666; margin: 5px 0;">
          <strong>Tanggal:</strong> ${formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone())}
        </p>
        <p style="font-size: 16px; color: #666; margin: 5px 0;">
          <strong>Lokasi:</strong> ${event.location.address}
        </p>
      </div>
      <p style="font-size: 16px; color: #666;">
        Kami menantikan kehadiran Anda!
      </p>
      <p style="font-size: 16px; color: #666;">
        Best regards,<br />
        ${process.env.APP_NAME}
      </p>
    </body>
    </html>
  `
}
