import { useEffect, useState } from 'react'
import { WaterResponse } from '@/types'
import { axiosScraping } from '@/lib/api/Axios'

export function useWaterLevelApi() {
  const [data, setData] = useState<WaterResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axiosScraping.get<WaterResponse>('/api/water-level')
        setData(res.data)
      } catch (error) {
        setData(null)
        throw error
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 10 * 60 * 1000)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { data, isLoading }
}
