'use client'

import { useState, useMemo, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/api/fetcher'
import WaterLevelChart from './WaterLevelChart'
import WaterLevelTable from './WaterLevelTable'
import { WaterResponse, WaterRow } from '@/types'
import { Box, Paper, Typography, TextField, MenuItem, Grid } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { WaterChartData } from '@/types'

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

export default function WaterLevelContent() {
  const { data, error, isLoading } = useSWR<WaterResponse>('/api/water-level', fetcher)
  const [selectedDate, setSelectedDate] = useState('')

  const uniqueDates = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.data.map((row) => row.date))).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )
  }, [data])

  useEffect(() => {
    if (uniqueDates.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDates[0])
    }
  }, [uniqueDates, selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const filteredData = useMemo(() => {
    if (!data) return { chartData: [], tableData: [], metadata: {} }
    const tableData = data.data.filter((row) => (selectedDate ? row.date === selectedDate : true))
    return {
      chartData: transformData(tableData),
      tableData,
      metadata: data.metadata,
    }
  }, [data, selectedDate])

  const latestDifference = useMemo(() => {
    if (!data || data.data.length < 2) return null

    const transformed = transformData(data.data)
    const sorted = [...transformed].sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime()) // 降順

    const latest = sorted[0]
    const previous = sorted[1]
    if (!latest || !previous) return null

    const diff = latest.value - previous.value

    return {
      latestValue: latest.value,
      diff,
    }
  }, [data])

  if (isLoading) return <div>読み込み中...</div>
  if (error) return <div>エラーが発生しました</div>
  if (!data) return <div>データがありません</div>

  return (
    <div className='p-4 space-y-6'>
      <ul className='mb-4'>
        {Object.entries(filteredData.metadata).map(([key, val]) => (
          <li key={key} className='text-gray-700'>
            {key}: {val}
          </li>
        ))}
      </ul>

      {latestDifference && (
        <Box
          component={Paper}
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
            px: 2,
            textAlign: 'center',
            backgroundColor: latestDifference.diff > 0 ? '#f0f4ff' : '#fde8e8',
            borderRadius: 2,
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>
            現在の水位
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 'medium', mb: 2 }}>
            {latestDifference.latestValue.toFixed(2)} m
          </Typography>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: latestDifference.diff > 0 ? '#1e88e5' : '#e53935',
              fontWeight: 'bold',
              gap: 0.5,
            }}
          >
            {latestDifference.diff > 0 ? (
              <>
                <ArrowUpwardIcon fontSize='medium' />+{latestDifference.diff.toFixed(2)} m
              </>
            ) : (
              <>
                <ArrowDownwardIcon fontSize='medium' />
                {latestDifference.diff.toFixed(2)} m
              </>
            )}
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={{ xs: 5, sm: 4, md: 3 }}>
          <TextField
            select
            label='日付で検索'
            value={selectedDate}
            onChange={handleDateChange}
            size='small'
            fullWidth
          >
            {uniqueDates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box component={Paper} sx={{ p: 2, mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          水位データ
        </Typography>
        <WaterLevelTable data={filteredData.tableData} metadata={filteredData.metadata} />
      </Box>

      <Box component={Paper} sx={{ p: 2 }}>
        <Typography variant='h6' gutterBottom>
          水位グラフ
        </Typography>
        <div style={{ height: 300 }}>
          <WaterLevelChart data={filteredData.chartData} />
        </div>
      </Box>
    </div>
  )
}
