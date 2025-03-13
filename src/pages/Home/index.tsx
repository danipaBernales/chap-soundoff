import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ProductCarousel from '../../components/ProductCarousel';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          py: 4
        }}>
          <Box sx={{ 
            textAlign: 'center',
            mb: 4
          }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '4rem', md: '8rem' },
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#4caf50',
                mb: 2
              }}
            >
              CHAP!
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '4rem', md: '8rem' },
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'linear-gradient(45deg, #9c27b0, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SOUNDOFF
            </Typography>
          </Box>
          
          <Box sx={{ 
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto'
          }}>
            <ProductCarousel />
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Home;