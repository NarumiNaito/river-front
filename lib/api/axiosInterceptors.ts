import { axios } from '@/lib/api/Axios'
import { ToastOptions } from '@/hooks/useToaster'

export const setupAxiosInterceptors = (toast: (options: ToastOptions) => void) => {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      const message = (response.data as { message?: string }).message
      if (response.status === 200 && message) {
        toast({
          title: '成功',
          description: message,
          variant: 'success',
          duration: 5000,
        })
      }
      return response
    },
    (error) => {
      const status = error.response?.status
      const message = error.response?.data?.message || error.message || '不明なエラーが発生しました'

      const statusMessages: Record<number, string> = {
        400: 'リクエストが不正です',
        401: '認証エラー（ログインしてください）',
        403: 'アクセス権限がありません',
        404: 'リソースが見つかりません',
        408: 'リクエストタイムアウト',
        409: '競合が発生しました',
        422: 'バリデーションエラー',
        429: 'リクエストが多すぎます',
        500: 'サーバーエラー',
        502: 'Bad Gateway',
        503: 'サービス利用不可',
        504: 'ゲートウェイタイムアウト',
      }

      const fallbackTitle = statusMessages[status as number] ?? 'エラー'
      const fallbackDescription = message

      toast({
        title: fallbackTitle,
        description: fallbackDescription,
        variant: 'error',
        duration: 7000,
      })
      return Promise.reject(error)
    }
  )

  return () => {
    axios.interceptors.response.eject(interceptor)
  }
}
