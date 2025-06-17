'use client'

import { TextField, MenuItem } from '@mui/material'

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dates: string[]
}

export default function DateSelector({ value, onChange, dates }: Props) {
  return (
    <TextField select label='日付で検索' value={value} onChange={onChange} size='small' fullWidth>
      {dates.map((date) => (
        <MenuItem key={date} value={date}>
          {date}
        </MenuItem>
      ))}
    </TextField>
  )
}
