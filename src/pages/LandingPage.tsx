import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/background-image.jpg")', // Add your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid
          container
          spacing={4}
          direction={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              color='primary'
              gutterBottom
            >
              Welcome to Your Document Management System
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              Manage your documents with ease and efficiency. Securely store,
              access, and share your documents from anywhere.
            </Typography>
            <Button
              href='/signin'
              variant='contained'
              color='primary'
              size='large'
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button
              href='/signup'
              variant='outlined'
              color='secondary'
              size='large'
            >
              Register
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={6}> */}
          {/* You can add an illustration or graphic related to document management here */}
          {/* <Box
              sx={{
                height: 250,
                backgroundColor: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
              }}
            >
              <Typography variant='h6' color='textSecondary'>
                Your secure document solution
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
      <Box sx={{ py: 2, textAlign: 'center', backgroundColor: 'primary.main' }}>
        <Typography variant='body2' color='white'>
          &copy; {new Date().getFullYear()} Document Management System. All
          rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
