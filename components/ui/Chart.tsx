'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Box } from '@mui/material'

interface ChartLineProps<T> {
  data: T[]
  dataKey: keyof T
  label?: string
  xKey?: keyof T
  unit?: string
  color?: string
  title?: string
}

export default function Chart<T extends Record<string, unknown>>({
  data,
  dataKey,
  label = '値',
  xKey = 'formattedDate',
  unit = '',
  color = '#8884d8',
}: ChartLineProps<T>) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
          <XAxis
            dataKey={xKey as string}
            interval='preserveStartEnd'
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor='end'
          />
          <YAxis
            label={{ angle: -90, position: 'insideLeft' }}
            tickFormatter={(v) => `${v}${unit}`}
          />
          <Tooltip
            formatter={(v: number | string) => {
              const val = typeof v === 'number' ? v : parseFloat(v)
              return [isNaN(val) ? '―' : `${val.toFixed(2)}${unit}`, label]
            }}
          />
          <CartesianGrid stroke='#ccc' />
          <Line
            type='monotone'
            dataKey={dataKey as string}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
