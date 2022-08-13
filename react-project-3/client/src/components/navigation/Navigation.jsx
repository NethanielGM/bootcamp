import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

import { Typography, IconButton, Toolbar, Tooltip, Box, AppBar, Menu, Container, MenuItem, Fab } from '@mui/material';

import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {

  // AUTH CONTEXT
  const { logout, user, handleLogin, handleSignUp, } = useContext(AuthContext);

  // NAVIGATION STATES
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // NAVIGATION HANDLERS
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // LOGOUR HANDLER
  const handleLogout = () => {
    logout()
    window.location.reload(false);
  }
  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                <div>
                  <MenuItem >
                    <Typography onClick={handleCloseNavMenu} as={NavLink} to='/' textAlign="center" className="color">Home</Typography>
                  </MenuItem>
                  <MenuItem >

                    <Typography onClick={handleCloseNavMenu} as={NavLink} to='/search' textAlign="center" className="color">Search</Typography>
                  </MenuItem>

                  {user &&
                    <MenuItem>
                      <Typography onClick={handleCloseNavMenu} as={NavLink} to='/pets' textAlign="center" className="color">pets</Typography>
                    </MenuItem>
                  }
                </div>
              }
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem >
              <Typography onClick={handleCloseNavMenu} as={NavLink} to='/' textAlign="center">Home</Typography>
            </MenuItem>
            <MenuItem >
              <Typography onClick={handleCloseNavMenu} as={NavLink} to='/search' textAlign="center">Search</Typography>
            </MenuItem>
            {user &&
              <MenuItem>
                <Typography onClick={handleCloseNavMenu} as={NavLink} to='/pets' textAlign="center">pets</Typography>
              </MenuItem>
            }
          </Box>
          {user ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Fab size="medium" color="primary" aria-label="add" onClick={handleOpenUserMenu}>
                  <AddIcon />

                </Fab>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {
                  <div>
                    <MenuItem >
                      <Typography as={NavLink} to='/' onClick={handleLogout} className="color" textAlign="center">Logout</Typography>
                      <Typography onClick={handleCloseUserMenu} as={NavLink} to='/profile' className="color" textAlign="center">Profile</Typography>
                    </MenuItem>
                    {user.role == "admin" &&
                      <MenuItem>
                        <Typography onClick={handleCloseUserMenu} as={NavLink} to='/admin/add' className="color" textAlign="center">Add pet</Typography>
                        <Typography onClick={handleCloseUserMenu} as={NavLink} to='/admin/users' className="color" textAlign="center">Users</Typography>
                        <Typography onClick={handleCloseUserMenu} as={NavLink} to='/admin/pets' className="color" textAlign="center">Pets</Typography>
                      </MenuItem>
                    }
                  </div>
                }
              </Menu>
            </Box> :
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={handleOpenUserMenu}>
                  <AddIcon sx={{ mr: 1 }} />
                  Join
                </Fab>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={handleLogin} className="color" textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={handleSignUp} className="color" textAlign="center">Sign Up</Typography>
                    </MenuItem>
                  </div>
                }
              </Menu>
            </Box>

          }
        </Toolbar>
      </Container>
    </AppBar >

  );
};
export default Navigation;

