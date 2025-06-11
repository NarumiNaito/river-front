'use client'

import * as React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/api/fetcher'
import VirtuosoTable from '@/components/ui/VirtuosoTable'

interface WaterRow {
  date: string
  time: string
  value: string
  flag: string
  [key: string]: string
}

interface WaterResponse {
  metadata: Record<string, string>
  data: WaterRow[]
}

const columns = [
  { dataKey: 'date', label: '日付', width: 100 },
  { dataKey: 'time', label: '時刻', width: 100 },
  { dataKey: 'value', label: '水位(m)', width: 100, numeric: true },
  { dataKey: 'flag', label: 'フラグ', width: 80 },
]

export default function WaterLevelTable() {
  const { data, error, isLoading } = useSWR<WaterResponse>('/api/water-level', fetcher)

  if (isLoading) return <div style={{ height: 200, backgroundColor: '#f0f0f0' }} />
  if (error) return <p>チャートの取得に失敗しました</p>
  if (!data) return <p>チャートデータがありません</p>

  return (
    <div className='p-4'>
      <ul className='mb-4'>
        {Object.entries(data.metadata).map(([key, val]) => (
          <li key={key} className='text-gray-700'>
            {key}: {val}
          </li>
        ))}
      </ul>
      <VirtuosoTable<WaterRow> columns={columns} data={data.data} height={350} />
    </div>
  )
}
