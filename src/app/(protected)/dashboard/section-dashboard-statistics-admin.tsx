'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Box, CalendarArrowUp, GraduationCap, MapPin, Stars, Users } from 'lucide-react'
import { ReloadIcon } from '@radix-ui/react-icons'

import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardStatisticsForAdmin } from '@/actions/dashboard.action'

const getStatistics = async () => {
  const response = await getDashboardStatisticsForAdmin()
  return response.data as {
    totalUsers: number
    totalStudent: number
    totalLecturers: number
    totalEvent: number
    totalEventReview: number
    totalResource: number
    totalLocation: number
  }
}

export const SectionDashboardStatisticsAdmin = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalStudent: 0,
    totalLecturers: 0,
    totalEvent: 0,
    totalEventReview: 0,
    totalResource: 0,
    totalLocation: 0
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
              Total Pengguna
            </CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalUsers}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Dosen
            </CardTitle>
            <GraduationCap />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalLecturers}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Siswa
            </CardTitle>
            <BookOpen />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalStudent}</div>
            )}
          </CardContent>
        </Card>
      </SectionLayout>
      <SectionLayout className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Peralatan
            </CardTitle>
            <Box />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalResource}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Lokasi
            </CardTitle>
            <MapPin />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalLocation}</div>
            )}
          </CardContent>
        </Card>
      </SectionLayout>
      <SectionLayout className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Acara
            </CardTitle>
            <CalendarArrowUp />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalEvent}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Ulasan
            </CardTitle>
            <Stars />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{statistics.totalEventReview}</div>
            )}
          </CardContent>
        </Card>
      </SectionLayout>
    </>
  )
}