'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, Button, Paper, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { axios } from '@/lib/api/Axios'
import { useAuthStore } from '@/stores/useAuthStore'

const schema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '正しいメールアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください' }),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  type User = {
    id: number
    name: string
    email: string
  }

  type RegisterResponse = {
    message: string
    user: User
  }

  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = async (data: FormData) => {
    await axios.get('sanctum/csrf-cookie')
    const response = await axios.post<RegisterResponse>('/api/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    const user = response.data.user

    setUser(user)
    router.push('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant='h4' align='center' gutterBottom fontWeight='bold'>
          新規登録
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            label='名前'
            type='name'
            fullWidth
            margin='normal'
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label='メールアドレス'
            type='email'
            fullWidth
            margin='normal'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='パスワード'
            type='password'
            fullWidth
            margin='normal'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            ログイン
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
