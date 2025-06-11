import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/assets/styles/thema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'

import theme from '@/assets/styles/thema'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'River Info',
  description: 'リアルタイム水位情報表示アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
