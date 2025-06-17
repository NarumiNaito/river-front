'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginUser, loginsSchema, LoginFormData } from '@/features/auth/api/userApi'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthForm } from '../components/AuthForm'
import { useLoadingStore } from '@/stores/useLoadingStore'

export default function LoginTemplate() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginsSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const { show, hide } = useLoadingStore.getState()
    show()
    try {
      const user = await loginUser(data)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
      hide()
    }
  }

  return (
    <AuthForm<LoginFormData>
      title='ログイン'
      fields={[
        { name: 'email', label: 'メールアドレス', type: 'email' },
        { name: 'password', label: 'パスワード', type: 'password' },
      ]}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText='ログイン'
    />
  )
}
