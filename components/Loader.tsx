'use client'
import { useLoadingStore } from '@/stores/useLoadingStore'
import Loading from './ui/Loading'

export default function Loader() {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <>
      <Loading />
    </>
  )
}
