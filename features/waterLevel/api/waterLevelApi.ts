import { useEffect, useState } from 'react'
import { WaterResponse, WaterLevelSetting } from '@/types'
import { axios, axiosScraping } from '@/lib/api/Axios'
import { useAuthStore } from '@/stores/useAuthStore'

export function useWaterLevelApi() {
  const [data, setData] = useState<WaterResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axiosScraping.get<WaterResponse>('api/water-level')
        setData(res.data)
      } catch (error) {
        setData(null)
        throw error
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000)
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

export async function fetchWaterLevelSettingDataApi(): Promise<WaterLevelSetting | null> {
  await axios.get('sanctum/csrf-cookie')
  const response = await axios.get('api/user-water-level/fetch')
  return response.data
}

export function useWaterLevelSettingDataApi() {
  const [settingData, setSettingData] = useState<WaterLevelSetting | null>(null)
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn) {
      setSettingData(null)
      return
    }
    const fetch = async () => {
      try {
        const data = await fetchWaterLevelSettingDataApi()
        setSettingData(data)
      } catch (error) {
        throw error
      }
    }
    fetch()
  }, [])

  return { settingData }
}
