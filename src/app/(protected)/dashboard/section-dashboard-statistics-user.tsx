'use client'

import { useEffect, useState } from 'react'

import { Hammer, Medal, Star } from 'lucide-react'
import { ReloadIcon } from '@radix-ui/react-icons'

import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getDashboardStatisticsForUser } from '@/actions/dashboard.action'

const getStatistics = async () => {
  const response = await getDashboardStatisticsForUser()
  return response.data as {
    totalParticipateInEvent: number
    totalEventReviewedByUser: number
    totalEventCreatedByUser: number
  }
}

export const SectionDashboardStatisticsUser = () => {
  const [statistics, setStatistics] = useState({
    totalParticipateInEvent: 0,
    totalEventReviewedByUser: 0,
    totalEventCreatedByUser: 0
  })
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getStatistics().then(data => {
      setStatistics(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <SectionLayout className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Acara yang Diikuti
            </CardTitle>
            <Medal />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalParticipateInEvent}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Ulasan dari Acara yang Diikuti
            </CardTitle>
            <Star />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalEventReviewedByUser}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Acara yang Dibuat
            </CardTitle>
            <Hammer />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalEventCreatedByUser}</div>
            )}
          </CardContent>
        </Card>
      </SectionLayout>
    </>
  )
}