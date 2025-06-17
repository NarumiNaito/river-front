import { useZodValidation } from '@/hooks/useZodValidation'
import { axios } from '@/lib/api/Axios'
import { UserResponse } from '@/types'
import { z } from 'zod'

const { requiredString, requiredEmail, requiredPassword } = useZodValidation

export const loginsSchema = z.object({
  email: requiredEmail(),
  password: requiredPassword(),
})

export const registerSchema = z.object({
  name: requiredString(),
  email: requiredEmail(),
  password: requiredPassword(),
})

export type LoginFormData = z.infer<typeof loginsSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export async function loginUser(data: LoginFormData) {
  await axios.get('sanctum/csrf-cookie')
  const response = await axios.post<UserResponse>('/api/login', data)
  return response.data.user
}

export async function registerUser(data: RegisterFormData) {
  await axios.get('sanctum/csrf-cookie')
  const response = await axios.post<UserResponse>('/api/register', data)
  return response.data.user
}
