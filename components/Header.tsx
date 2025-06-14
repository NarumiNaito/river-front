'use client'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { authContent } from '@/const/headerContent'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  return (
    <AppBar position='static' component='div'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='div' color='inherit'>
          大河津水位モニタリング
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {isLoggedIn ? (
            <Button color='inherit' onClick={handleLogout}>
              ログアウト
            </Button>
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
