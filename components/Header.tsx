'use client'
import { AppBar, Toolbar, Typography } from '@mui/material'

export default function Header() {
  return (
    <AppBar position='static' component='div'>
      <Toolbar>
        <Typography variant='h6' component='div'>
          大河津水位モニタリング
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
