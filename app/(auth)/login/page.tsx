'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import { useRouter } from 'next/navigation'
import { axios } from '@/lib/api/Axios'

const schema = z.object({
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
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    await axios.get('sanctum/csrf-cookie')
    await axios.post('api/login', { email: data.email, password: data.password })
    router.push('/dashboard')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='w-full max-w-md p-6'>
        <Card className='shadow-2xl'>
          <CardContent className='p-6 space-y-6'>
            <h2 className='text-3xl font-bold text-center text-gray-800'>ログイン</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-1'>
                <label className='text-sm font-medium text-gray-700'>メールアドレス</label>
                <Input type='email' placeholder='you@example.com' {...register('email')} />
                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium text-gray-700'>パスワード</label>
                <Input type='password' placeholder='••••••••' {...register('password')} />
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password.message}</p>
                )}
              </div>
              <Button type='submit' className='w-full'>
                ログイン
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
