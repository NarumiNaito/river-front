import { useMemo } from 'react'
import { WaterResponse, WaterRow, WaterChartData } from '@/types'

function transformData(data: WaterRow[]): WaterChartData[] {
  return data
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
}

export function useWaterLevelLogic(data: WaterResponse | undefined, selectedDate: string) {
  const uniqueDates = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.data.map((row) => row.date))).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )
  }, [data])

  const filteredData = useMemo(() => {
    if (!data) return { chartData: [], tableData: [], metadata: {} }
    const cloned = JSON.parse(JSON.stringify(data))
    const tableData = cloned.data.filter((row: { date: string }) =>
      selectedDate ? row.date === selectedDate : true
    )
    return {
      chartData: transformData(tableData),
      tableData,
      metadata: cloned.metadata,
    }
  }, [data, selectedDate])

  const latestDifference = useMemo(() => {
    if (!data || data.data.length < 2) return null
    const transformed = transformData(data.data)
    const sorted = [...transformed].sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())

    const [latest, previous] = sorted
    if (!latest || !previous) return null

    return {
      latestValue: latest.value,
      diff: latest.value - previous.value,
    }
  }, [data])

  return { uniqueDates, filteredData, latestDifference }
}
