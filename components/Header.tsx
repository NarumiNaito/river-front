'use client'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export default function Header() {
  return (
    <AppBar position='static' component='div'>
      <Toolbar>
        <Typography variant='h6' component='div'>
          大河津水位モニタリング
        </Typography>
      </Toolbar>
      <Link href={'/login'}>ログイン</Link>
    </AppBar>
  )
}
