import { axiosScraping } from '@/lib/api/Axios'
import { useLoadingStore } from '@/stores/useLoadingStore'

export const fetcher = async <T>(url: string): Promise<T> => {
  const { show, hide } = useLoadingStore.getState()

  try {
    show()
    const res = await axiosScraping.get<T>(url)
    return res.data
  } catch (error) {
    throw error
  } finally {
    hide()
  }
}
