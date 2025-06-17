'use client'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormHandleSubmit,
  Path,
} from 'react-hook-form'

type AuthFormProps<T extends FieldValues> = {
  title: string
  fields: {
    name: Path<T>
    label: string
    type?: string
  }[]
  errors: FieldErrors<T>
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  onSubmit: (data: T) => void
  submitText?: string
}

export function AuthForm<T extends FieldValues>({
  title,
  fields,
  errors,
  register,
  handleSubmit,
  onSubmit,
  submitText = '送信',
}: AuthFormProps<T>) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant='h4' align='center' gutterBottom fontWeight='bold'>
          {title}
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          {fields.map((field) => (
            <TextField
              key={String(field.name)}
              label={field.label}
              type={field.type || 'text'}
              fullWidth
              margin='normal'
              {...register(field.name)}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message as string}
            />
          ))}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            {submitText}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
