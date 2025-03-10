import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Navbar from '../Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      color: 'text.primary',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: 10, pb: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;