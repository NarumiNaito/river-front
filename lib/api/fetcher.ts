import { axiosScraping } from '@/lib/api/Axios'

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axiosScraping.get<T>(url)
  return res.data
}
