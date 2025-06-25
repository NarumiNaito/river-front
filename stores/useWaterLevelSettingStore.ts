import { create } from 'zustand'
import { WaterLevelSetting } from '@/types'

type WaterLevelStore = {
  settingsData: WaterLevelSetting | null
  latestValue: number | null
  setSettingData: (data: WaterLevelSetting | null) => void
  setLatestValue: (value: number | null) => void
}

export const useWaterLevelSettingStore = create<WaterLevelStore>((set) => ({
  settingsData: null,
  latestValue: null,
  setSettingData: (data) => set({ settingsData: data }),
  setLatestValue: (value) => set({ latestValue: value }),
}))

export const useCanCatchFishNow = () =>
  useWaterLevelSettingStore((state) => {
    const { settingsData, latestValue } = state
    return (
      settingsData !== null &&
      latestValue !== null &&
      latestValue >= settingsData.min &&
      latestValue <= settingsData.max
    )
  })
