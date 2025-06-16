'use client'
import { AppBar, Box, Toolbar, Button, Skeleton } from '@mui/material'
import Link from 'next/link'
import { authContent } from '@/const/headerContent'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { axios } from '@/lib/api/Axios'

export default function Header() {
  const { isLoggedIn, logout, user, isAuthChecked } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.get('sanctum/csrf-cookie')
      await axios.post('api/user/logout')
      logout()
      router.push('/login')
    } catch (error) {
      console.error('ログイン失敗:', error)
      router.push('/dashboard')
    } finally {
    }
  }

  return (
    <AppBar position='static' component='div'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link
          href='/'
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.2rem',
          }}
        >
          大河津水位モニタリング
        </Link>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isAuthChecked ? (
            <>
              <Skeleton variant='rectangular' width={100} height={36} />
            </>
          ) : isLoggedIn ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>{user?.name}</Box>
              <Button color='inherit' onClick={handleLogout}>
                ログアウト
              </Button>
            </>
          ) : (
            authContent.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                {item.title}
              </Link>
            ))
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
