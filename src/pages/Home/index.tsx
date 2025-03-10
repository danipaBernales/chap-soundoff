import { Box, Typography, Container } from '@mui/material';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import ProductCarousel from '../../components/ProductCarousel';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1]);
  const reverseY = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="xl" ref={containerRef}>
        <Box sx={{ py: 8, overflow: 'hidden', position: 'relative', height: '100vh' }}>
          <motion.div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              zIndex: 1
            }}
          >
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  textAlign: 'center',
                  fontSize: { xs: '5rem', md: '12rem' },
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transform: 'rotate(-5deg)',
                  color: '#4caf50',
                  mb: -8
                }}
              >
                CHAP!
              </Typography>
            </motion.div>

            <motion.div
              style={{
                y: reverseY,
                opacity: titleOpacity
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  textAlign: 'center',
                  fontSize: { xs: '5rem', md: '12rem' },
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transform: 'rotate(5deg) scaleX(-1)',
                  background: 'linear-gradient(45deg, #9c27b0, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SOUNDOFF
              </Typography>
            </motion.div>
          </motion.div>

          <Box sx={{ position: 'relative', zIndex: 2, mt: { xs: '100vh', md: '120vh' } }}>
            <ProductCarousel />
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Home;