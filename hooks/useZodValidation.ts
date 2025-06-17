import { z } from 'zod'

const optionalString = () => z.string().optional().nullable()

const requiredString = (message = '入力してください') =>
  z.string({ required_error: message, invalid_type_error: message }).min(1, message)

const optionalNumber = () =>
  z.number({ invalid_type_error: '数値で入力してください' }).optional().nullable()

const requiredNumber = (message = '入力してください') =>
  z.number({ required_error: message, invalid_type_error: '数値で入力してください' })

const requiredBoolean = (message = '選択してください') => z.boolean({ required_error: message })

const requiredRadio = (message = '選択してください') =>
  z.string({ required_error: message }).min(1, message)

const requiredEmail = () =>
  z.string({ required_error: '入力してください' }).email('メールアドレスの形式ではありません')

const optionalEmail = () =>
  z.string().email('メールアドレスの形式ではありません').or(z.literal('')).optional().nullable()

const requiredPassword = (message = '入力してください') =>
  z.string({ required_error: message }).min(6, '6文字以上で入力してください')

const newPassword = () =>
  z
    .union([z.string().length(0, { message: '6文字以上で入力してください' }), z.string().min(6)])
    .optional()
    .nullable()

export const useZodValidation = {
  optionalString,
  requiredString,
  optionalNumber,
  requiredNumber,
  requiredBoolean,
  requiredRadio,
  requiredEmail,
  optionalEmail,
  requiredPassword,
  newPassword,
}
