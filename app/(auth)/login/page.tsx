'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, Button, Paper, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { axios } from '@/lib/api/Axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToaster } from '@/hooks/useToaster'

const schema = z.object({
  email: z.string().email({ message: '正しいメールアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください' }),
})

type FormData = z.infer<typeof schema>
type User = {
  id: number
  name: string
  email: string
}

type LoginResponse = {
  message: string
  user: User
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const { toast } = useToaster()
  const onSubmit = async (data: FormData) => {
    try {
      await axios.get('sanctum/csrf-cookie')
      const response = await axios.post<LoginResponse>('/api/login', data)
      const user = response.data.user
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
    }
  }

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
      {' '}
      <button
        onClick={() =>
          toast({
            title: 'テスト',
            description: 'トースト表示テストです',
            variant: 'success',
          })
        }
      >
        トーストを表示
      </button>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant='h4' align='center' gutterBottom fontWeight='bold'>
          ログイン
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
