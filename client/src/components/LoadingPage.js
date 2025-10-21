import {
  Container,
  Box,
  CircularProgress,
} from '@mui/material';

function LoadingPage(props) {
  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} display="flex" justifyContent="center">
        <CircularProgress size={36} />
      </Box>
    </Container>
  )
}

export default LoadingPage;