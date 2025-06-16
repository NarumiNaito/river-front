'use client'

import { Snackbar, Alert } from '@mui/material'
import { useToastStore } from '@/stores/useToastStore'

export function Toast() {
  const { open, message, severity, duration, hideToast } = useToastStore()
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={hideToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={hideToast} severity={severity} sx={{ width: '100%' }} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}
