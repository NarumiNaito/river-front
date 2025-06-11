import { Container } from '@mui/material'
import WaterLevelContent from '@/features/waterLevel/WaterLevelContent'

export default function Home() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <WaterLevelContent />
    </Container>
  )
}
