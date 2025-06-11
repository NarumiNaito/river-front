'use client'

import * as React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/api/fetcher'
import WaterLineChart, { WaterChartData } from '@/components/ui/Chart'

interface WaterRow {
  date: string
  time: string
  value: string
  flag: string
}

interface WaterResponse {
  metadata: Record<string, string>
  data: WaterRow[]
}

const transformData = (data: WaterRow[]): WaterChartData[] =>
  data
    .map((row) => {
      const safeDate = row.date.replace(/\//g, '-')
      const dateObj = new Date(`${safeDate}T${row.time}`)
      return {
        dateTime: dateObj,
        formattedDate: `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${row.time}`,
        value: parseFloat(row.value),
      }
    })
    .filter((row) => !isNaN(row.dateTime.getTime()))
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

export default function WaterLevelChart() {
  const { data, error, isLoading } = useSWR<WaterResponse>('/api/water-level', fetcher)

  if (isLoading) return <div style={{ height: 200, backgroundColor: '#f0f0f0' }} />
  if (error) return <p>チャートの取得に失敗しました</p>
  if (!data) return <p>チャートデータがありません</p>

  const chartData = transformData(data.data)

  return (
    <div style={{ width: '100%', height: 400 }}>
      <WaterLineChart data={chartData} />
    </div>
  )
}
