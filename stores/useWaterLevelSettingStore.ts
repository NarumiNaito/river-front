import { create } from 'zustand'
import { WaterLevelSetting } from '@/types'

type WaterLevelStore = {
  settingData: WaterLevelSetting | null
  latestValue: number | null
  setSettingData: (data: WaterLevelSetting | null) => void
  setLatestValue: (value: number | null) => void
}

export const useWaterLevelSettingStore = create<WaterLevelStore>((set) => ({
  settingData: null,
  latestValue: null,
  setSettingData: (data) => set({ settingData: data }),
  setLatestValue: (value) => set({ latestValue: value }),
}))

export const useCanCatchFishNow = () =>
  useWaterLevelSettingStore((state) => {
    const { settingData, latestValue } = state
    return (
      settingData !== null &&
      latestValue !== null &&
      latestValue >= settingData.min &&
      latestValue <= settingData.max
    )
  })
