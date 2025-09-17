import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material'
import type { UserDto } from './User'

interface UserCardProps {
  user: UserDto | null
  hideModal: () => void
}

export default function UserCard({ user, hideModal }: UserCardProps) {
  return (
    <Container>
      <Card sx={{ borderBottom: 0 }}>
        <CardHeader title={user?.name} subheader={user?.username} />
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 2 }}
          >
            <strong>E-mail:</strong>
            <br />
            {user?.email}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 2 }}
          >
            <strong>Phone:</strong>
            <br />
            {user?.phone}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 2 }}
          >
            <strong>Company:</strong>
            <br />
            {user?.company.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>City:</strong>
            <br />
            {user?.address.city}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Button onClick={hideModal} variant="outlined">
          Close
        </Button>
      </Box>
    </Container>
  )
}
