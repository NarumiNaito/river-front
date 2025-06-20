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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    min: z
      .number({ invalid_type_error: '数値を入力してください' })
      .min(5, '5.00以上を入力してください')
      .max(7, '7.00以下を入力してください'),
    max: z
      .number({ invalid_type_error: '数値を入力してください' })
      .min(5, '5.00以上を入力してください')
      .max(7, '7.00以下を入力してください'),
  })
  .refine((data) => data.min < data.max, {
    message: '下限値は上限値より小さくしてください',
    path: ['min'],
  })

type FormData = z.infer<typeof schema>

type Props = {
  open: boolean
  onClose: () => void
  onSave: (values: FormData) => void
  initialMin?: number
  initialMax?: number
}

export default function WaterLevelEditDialog({
  open,
  onClose,
  onSave,
  initialMin = 5.5,
  initialMax = 6.5,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      min: initialMin,
      max: initialMax,
    },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = (data: FormData) => {
    onSave(data)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
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
            inputProps={{
              step: 0.01,
              min: 5,
              max: 7,
            }}
            {...register('min', { valueAsNumber: true })}
            error={!!errors.min}
            helperText={errors.min?.message}
          />
          <TextField
            label='上限 (max)'
            type='number'
            fullWidth
            inputProps={{
              step: 0.01,
              min: 5,
              max: 7,
            }}
            {...register('max', { valueAsNumber: true })}
            error={!!errors.max}
            helperText={errors.max?.message}
          />
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type='submit' variant='contained'>
              保存
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
