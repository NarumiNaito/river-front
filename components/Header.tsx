'use client'
import { AppBar, Box, Toolbar, Button, Skeleton, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import { authContent } from '@/const/headerContent'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import WaterLevelEditDialog from '@/features/waterLevel/components/WaterEditDialog'
import {
  useWaterLevelSettingDataApi,
  waterLevelEdit,
} from '@/features/waterLevel/api/waterLevelApi'
import { logoutUser } from '@/features/auth/api/userApi'
import { useWaterLevelSettingStore } from '@/stores/useWaterLevelSettingStore'

export default function Header() {
  const { isLoggedIn, logout, user, isAuthChecked } = useAuthStore()
  const { setSettingData } = useWaterLevelSettingStore()
  const { settingData } = useWaterLevelSettingDataApi()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [minWaterLevel, setMinWaterLevel] = useState<number | undefined>(undefined)
  const [maxWaterLevel, setMaxWaterLevel] = useState<number | undefined>(undefined)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleMenuClose()
    try {
      logoutUser()
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
      await waterLevelEdit({ min, max })
      setSettingData({ min, max })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (settingData) {
      setMinWaterLevel(settingData.min)
      setMaxWaterLevel(settingData.max)
    }
  }, [settingData])

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
        initialMin={minWaterLevel ?? 5.5}
        initialMax={maxWaterLevel ?? 6.5}
      />
    </>
  )
}
