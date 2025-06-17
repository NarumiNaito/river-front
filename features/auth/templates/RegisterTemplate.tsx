'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registerUser, registerSchema, RegisterFormData } from '@/features/auth/api/userApi'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthForm } from '../components/AuthForm'
import { useLoadingStore } from '@/stores/useLoadingStore'

export default function RegisterTemplate() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { show, hide } = useLoadingStore.getState()
    show()
    try {
      const user = await registerUser(data)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
      hide()
    }
  }

  return (
    <AuthForm<RegisterFormData>
      title='新規登録'
      fields={[
        { name: 'name', label: '名前' },
        { name: 'email', label: 'メールアドレス', type: 'email' },
        { name: 'password', label: 'パスワード', type: 'password' },
      ]}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText='登録'
    />
  )
}
