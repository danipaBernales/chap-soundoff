import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

interface User {
  avatar_url?: string;
  name?: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // Simulate login with mock user data
    setUser({
      name: 'Test User',
      avatar_url: 'https://via.placeholder.com/40'
    });
  };

  const handleLogout = () => {
    setUser(null);
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            background: 'linear-gradient(45deg, #9c27b0, #4caf50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          chap! soundoff
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary">
            <ShoppingCartIcon />
          </IconButton>
          {user ? (
            <>
              <IconButton onClick={handleMenu} color="primary">
                {user.avatar_url ? (
                  <Avatar src={user.avatar_url} />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="primary" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
