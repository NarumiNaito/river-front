import { Container, Typography } from '@mui/material'
import WaterLevelContent from '@/features/waterLevel/WaterLevelContent'

export default function Home() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom align='center'>
        大河津水位モニタリング
      </Typography>
      <WaterLevelContent />
    </Container>
  )
}
