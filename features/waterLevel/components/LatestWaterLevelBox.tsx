'use client'

import { Box, Paper, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface Props {
  latestValue: number
  diff: number
}

export default function LatestWaterLevelBox({ latestValue, diff }: Props) {
  const isRise = diff > 0

  return (
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
        backgroundColor: isRise ? '#f0f4ff' : '#fde8e8',
        borderRadius: 2,
      }}
    >
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>
        現在の水位
      </Typography>
      <Typography variant='h4' sx={{ fontWeight: 'medium', mb: 2 }}>
        {latestValue.toFixed(2)} m
      </Typography>
      <Typography
        variant='h5'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: isRise ? '#1e88e5' : '#e53935',
          fontWeight: 'bold',
          gap: 0.5,
        }}
      >
        {isRise ? (
          <>
            <ArrowUpwardIcon fontSize='medium' />+{diff.toFixed(2)} m
          </>
        ) : (
          <>
            <ArrowDownwardIcon fontSize='medium' />
            {diff.toFixed(2)} m
          </>
        )}
      </Typography>
    </Box>
  )
}
