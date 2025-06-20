'use client'
import { AppBar, Box, Toolbar, Button, Skeleton, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import { authContent } from '@/const/headerContent'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { axios } from '@/lib/api/Axios'
import { useState } from 'react'
import WaterLevelEditDialog from '@/features/waterLevel/components/WaterEditDialog'

export default function Header() {
  const { isLoggedIn, logout, user, isAuthChecked } = useAuthStore()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const [minWaterLevel, setMinWaterLevel] = useState(5.5)
  const [maxWaterLevel, setMaxWaterLevel] = useState(6.5)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleMenuClose()
    try {
      await axios.get('sanctum/csrf-cookie')
      await axios.post('api/user/logout')
      logout()
      router.push('/login')
    } catch (error) {
      router.push('/dashboard')
      throw error
    }
  }

  const handleWaterLevelEdit = () => {
    handleMenuClose()
    setEditDialogOpen(true)
  }

  const handleSaveWaterLevel = async ({ min, max }: { min: number; max: number }) => {
    setMinWaterLevel(min)
    setMaxWaterLevel(max)

    try {
      await axios.get('sanctum/csrf-cookie')
      await axios.post('/api/user-water-level/setting', { min, max })
    } catch (error) {
      throw error
    }
  }

  return (
    <>
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
            {isAuthChecked && isLoggedIn ? (
              <>
                <Box>
                  <Button color='inherit' onClick={handleMenuOpen} startIcon={<AccountCircle />}>
                    {user?.name}
                  </Button>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleWaterLevelEdit}>水位編集</MenuItem>
                    <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : !isAuthChecked ? (
              <Skeleton variant='rectangular' width={100} height={36} />
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

      <WaterLevelEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveWaterLevel}
        initialMin={minWaterLevel}
        initialMax={maxWaterLevel}
      />
    </>
  )
}
