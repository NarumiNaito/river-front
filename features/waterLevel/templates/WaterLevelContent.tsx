'use client'

import { useState, useEffect, useCallback } from 'react'
import { Box, Paper, Typography, Grid, Container } from '@mui/material'
import WaterLevelChart from '../components/WaterLevelChart'
import WaterLevelTable from '../components/WaterLevelTable'
import LatestWaterLevelBox from '../components/LatestWaterLevelBox'
import DateSelector from '../components/DateSelector'
import WaterMetadata from '../components/WaterMetaData'
import Loading from '@/components/ui/Loading'
import { useWaterLevelSettingDataApi, useWaterLevelApi } from '../api/waterLevelApi'
import { useWaterLevelLogic } from '../hooks/useWaterLevelLogic.ts'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCanCatchFishNow, useWaterLevelSettingStore } from '@/stores/useWaterLevelSettingStore'

export default function WaterLevelContent() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const { data, isLoading } = useWaterLevelApi()
  const { settingData } = useWaterLevelSettingDataApi()
  const { isLoggedIn } = useAuthStore()
  const { settingsData, setSettingData, setLatestValue } = useWaterLevelSettingStore()
  const canCatchFishNow = useCanCatchFishNow()

  const { uniqueDates, filteredData, latestDifference } = useWaterLevelLogic(
    data ?? undefined,
    selectedDate
  )

  useEffect(() => {
    if (uniqueDates.length > 0) {
      setSelectedDate(uniqueDates[0])
    }
  }, [uniqueDates])

  useEffect(() => {
    if (settingData) {
      setSettingData(settingData)
    }
  }, [settingData, setSettingData])

  useEffect(() => {
    if (latestDifference?.latestValue !== undefined) {
      setLatestValue(latestDifference.latestValue)
    }
  }, [latestDifference, setLatestValue])

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <div className='p-4 space-y-6'>
        {latestDifference && (
          <LatestWaterLevelBox
            latestValue={latestDifference.latestValue}
            diff={latestDifference.diff}
          />
        )}

        <Box
          sx={{
            backgroundColor: '#d0f0c0',
            color: '#2e7d32',
            p: 2,
            borderRadius: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          釣れる水位：{settingsData?.min} 〜 {settingsData?.max} m
        </Box>

        {canCatchFishNow && isLoggedIn && (
          <Box
            sx={{
              backgroundColor: '#d0f0c0',
              color: '#2e7d32',
              p: 2,
              borderRadius: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            今釣れます！
          </Box>
        )}

        <WaterMetadata metadata={filteredData.metadata} />

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid size={{ xs: 5, sm: 4, md: 3 }}>
            <DateSelector value={selectedDate} onChange={handleDateChange} dates={uniqueDates} />
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
    </Container>
  )
}
