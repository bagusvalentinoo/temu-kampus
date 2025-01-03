import Link from 'next/link'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { confirmEventParticipant } from '@/actions/event-participate.action'
import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'

const EventConfirmationPage = async ({ searchParams }: { searchParams: { token: string } }) => {
  if (!searchParams.token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-center">Token tidak ditemukan</p>
      </div>
    )
  }

  const confirmEventParticipantRes = await confirmEventParticipant({
    eventParticipantId: searchParams.token
  })

  if (!confirmEventParticipantRes.success || !confirmEventParticipantRes.data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-center">{confirmEventParticipantRes.message}</p>
      </div>
    )
  }

  const event = confirmEventParticipantRes.data

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-[650px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Pendaftaran Berhasil!</CardTitle>
          <CardDescription>Anda telah terdaftar sebagai peserta acara</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-gray-500" />
                <span>{formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone()) + ' - ' + formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-gray-500" />
                <span>{event?.location?.address}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Langkah selanjutnya:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Tandai tanggal di kalender Anda</li>
              <li>Persiapkan diri Anda untuk acara</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Kembali ke Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/events/${event.id}/detail`}>
              Lihat Detail Acara
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EventConfirmationPage
