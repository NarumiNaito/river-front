'use client'

import { WaterChartData } from '@/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface Props {
  data: WaterChartData[]
}

export default function WaterLevelChart({ data }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data} margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
        <XAxis
          dataKey='formattedDate'
          interval='preserveStartEnd'
          tick={{ fontSize: 10 }}
          angle={-45}
          textAnchor='end'
        />
        <YAxis
          label={{ angle: -90, position: 'insideLeft' }}
          tickFormatter={(value) => `${value} m`}
        />
        <Tooltip
          formatter={(value: number | string) => {
            const num = typeof value === 'number' ? value : parseFloat(value)
            return [isNaN(num) ? '―' : `${num.toFixed(2)} m`, '水位']
          }}
        />
        <CartesianGrid stroke='#ccc' />
        <Line type='monotone' dataKey='value' stroke='#8884d8' strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
