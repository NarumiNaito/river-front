import type { Metadata } from 'next'
import '@/assets/styles/thema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '@/assets/styles/thema'
import ClientAuthProvider from '@/Providers/ClientAuthProvider'
import { Toast } from '@/components/ui/Toast'
import { AxiosClientProvider } from '@/Providers/AxiosClientProvider'

export const metadata: Metadata = {
  title: 'River Info',
  description: 'リアルタイム水位情報表示アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AxiosClientProvider>
              <ClientAuthProvider>
                <Header />
                <Toast />
                {children}
                <Footer />
              </ClientAuthProvider>
            </AxiosClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
