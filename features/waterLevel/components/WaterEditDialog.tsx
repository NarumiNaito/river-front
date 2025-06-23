'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { waterLevelSchema, WaterLevelFormData } from '../api/waterLevelApi'
import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (values: WaterLevelFormData) => Promise<void>
  initialMin?: number
  initialMax?: number
}

export default function WaterLevelEditDialog({
  open,
  onClose,
  onSave,
  initialMin,
  initialMax,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaterLevelFormData>({
    resolver: zodResolver(waterLevelSchema),
    defaultValues: {
      min: initialMin,
      max: initialMax,
    },
  })

  useEffect(() => {
    if (open && initialMin !== undefined && initialMax !== undefined) {
      reset({
        min: initialMin,
        max: initialMax,
      })
    }
  }, [open, initialMin, initialMax, reset])

  const onSubmit = (data: WaterLevelFormData) => {
    onSave(data)
    onClose()
  }

  const handleExited = () => {
    reset()
  }

  return (
    <Dialog open={open} onClose={handleExited} maxWidth='sm' fullWidth>
      <DialogTitle>水位の下限・上限を編集</DialogTitle>
      <DialogContent dividers>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          gap={2}
          mt={1}
        >
          <TextField
            label='下限 (min)'
            type='number'
            fullWidth
            slotProps={{
              input: {
                inputProps: {
                  step: 0.01,
                  min: 5,
                  max: 7,
                },
              },
            }}
            {...register('min', { valueAsNumber: true })}
            error={!!errors.min}
            helperText={errors.min?.message}
          />
          <TextField
            label='上限 (max)'
            type='number'
            fullWidth
            slotProps={{
              input: {
                inputProps: {
                  step: 0.01,
                  min: 5,
                  max: 7,
                },
              },
            }}
            {...register('max', { valueAsNumber: true })}
            error={!!errors.max}
            helperText={errors.max?.message}
          />
          <DialogActions>
            <Button onClick={onClose}>キャンセル</Button>
            <Button type='submit' variant='contained'>
              保存
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
