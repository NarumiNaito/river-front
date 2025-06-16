import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'River Info',
  description: 'リアルタイム水位情報表示アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
