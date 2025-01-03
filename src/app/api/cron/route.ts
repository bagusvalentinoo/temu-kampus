import { NextResponse } from 'next/server'
import { sendEmailEventConfirmationJob } from '@/lib/jobs'

export async function GET() {
  await sendEmailEventConfirmationJob()
  return NextResponse.json({ ok: true })
}
