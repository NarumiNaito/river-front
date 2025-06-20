'use client'

import { useState, useEffect } from 'react'
import { Box, Paper, Typography, Grid, Container } from '@mui/material'
import WaterLevelChart from '../components/WaterLevelChart'
import WaterLevelTable from '../components/WaterLevelTable'
import LatestWaterLevelBox from '../components/LatestWaterLevelBox'
import DateSelector from '../components/DateSelector'
import WaterMetadata from '../components/WaterMetaData'
import { useWaterLevelSettingDataApi, useWaterLevelApi } from '../api/waterLevelApi'
import { useWaterLevelLogic } from '../hooks/useWaterLevelLogic.ts'
import Loading from '@/components/ui/Loading'
import { useAuthStore } from '@/stores/useAuthStore'

export default function WaterLevelContent() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const { data, isLoading } = useWaterLevelApi()
  const { settingData } = useWaterLevelSettingDataApi()
  const { isLoggedIn } = useAuthStore()

  const { uniqueDates, filteredData, latestDifference } = useWaterLevelLogic(
    data ?? undefined,
    selectedDate
  )

  useEffect(() => {
    if (uniqueDates.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDates[0])
    }
  }, [uniqueDates, selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  if (isLoading)
    return (
      <main>
        <Loading />
      </main>
    )

  const canCatchFishNow =
    settingData &&
    latestDifference &&
    latestDifference.latestValue >= settingData.min &&
    latestDifference.latestValue <= settingData.max

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <div className='p-4 space-y-6'>
        {latestDifference && (
          <LatestWaterLevelBox
            latestValue={latestDifference.latestValue}
            diff={latestDifference.diff}
          />
        )}

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
