import type { Metadata } from 'next'
import ClientAuthProvider from '@/Providers/ ClientAuthProvider'

export const metadata: Metadata = {
  title: 'River Info',
  description: 'リアルタイム水位情報表示アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ClientAuthProvider>{children}</ClientAuthProvider>
    </main>
  )
}
