import { axiosScraping } from '@/lib/api/Axios'

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const res = await axiosScraping.get<T>(url)
    return res.data
  } catch (error) {
    throw error
  } finally {
  }
}

export const fetcherScraping = async <T>(url: string): Promise<T> => {
  try {
    const res = await axiosScraping.get<T>(url)
    return res.data
  } catch (error) {
    throw error
  } finally {
  }
}
