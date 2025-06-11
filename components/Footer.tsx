'use client'
import { AppBar, Toolbar, Typography } from '@mui/material'
export default function Footer() {
  return (
    <AppBar position='static' component='div' sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant='body2' color='inherit' align='center'>
          © {new Date().getFullYear()} 大河津水位モニタリング
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
