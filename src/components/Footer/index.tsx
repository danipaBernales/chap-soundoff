import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          style={{
            opacity,
            scale
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #9c27b0, #4caf50, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            chap! soundoff
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <IconButton
              color="primary"
              component={motion.a}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={motion.a}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={motion.a}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              opacity: 0.7
            }}
          >
            © {new Date().getFullYear()} chap! soundoff. All rights reserved.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;