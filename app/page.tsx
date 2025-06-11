'use client'

import { Box, Container, Paper, Typography } from '@mui/material'
import WaterLevelChart from '@/features/waterLevel/WaterLevelChart'
import WaterLevelTable from '@/features/waterLevel/WaterLevelTable'

export default function Home() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom align='center'>
        大河津水位モニタリング
      </Typography>

      <Box component={Paper} sx={{ p: 2, mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          水位データ一覧
        </Typography>
        <WaterLevelTable />
      </Box>

      <Box component={Paper} sx={{ p: 2 }}>
        <Typography variant='h6' gutterBottom>
          水位グラフ
        </Typography>
        <WaterLevelChart />
      </Box>
    </Container>
  )
}
