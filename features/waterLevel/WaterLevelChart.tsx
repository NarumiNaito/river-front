'use client'

import Chart from '@/components/ui/Chart'
import { WaterChartData } from '@/types'

interface Props {
  data: WaterChartData[]
}

export default function WaterLevelChart({ data }: Props) {
  return (
    <div className='p-4'>
      <Chart<WaterChartData> data={data} dataKey='value' label='水位' unit=' m' color='#8884d8' />
    </div>
  )
}
