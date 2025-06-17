'use client'

import VirtuosoTable from '@/components/ui/VirtuosoTable'
import { WaterRow } from '@/types'

const columns = [
  { dataKey: 'date', label: '日付', width: 100 },
  { dataKey: 'time', label: '時刻', width: 100 },
  { dataKey: 'value', label: '水位(m)', width: 100, numeric: true },
  { dataKey: 'flag', label: 'フラグ', width: 80 },
]

export default function WaterLevelTable({
  data,
}: {
  data: WaterRow[]
  metadata?: Record<string, string>
}) {
  return (
    <div className='p-4'>
      <VirtuosoTable<WaterRow> columns={columns} data={data} height={350} />
    </div>
  )
}
