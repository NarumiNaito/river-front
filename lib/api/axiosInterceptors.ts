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
      const message = error.response?.data?.message || error.message || '不明なエラーが発生しました'
      toast({
        title: 'エラー',
        description: message,
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
