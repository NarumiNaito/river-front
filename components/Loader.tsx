'use client'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { Box, CircularProgress, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export default function Loader() {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        variant='h6'
        sx={{ mt: 2 }}
      >
        読み込み中です...
      </Typography>
    </Box>
  )
}
