import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SpaIcon from '@mui/icons-material/Spa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
  { name: '홈', path: '/' },
  { name: '페어링', path: '/pairing' },
  { name: '주류', path: '/liquors' },
  { name: '재료', path: '/ingredients' },
  { name: '소개', path: '/about' }
];

function Header({ isAuthenticated, user, onLogout }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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
  
  const handleLogout = () => {
    handleCloseUserMenu();
    onLogout();
    navigate('/');
  };

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 로고 - 데스크탑 */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <SpaIcon sx={{ fontSize: 36, mr: 1, color: 'white' }} />
              <Typography
                variant="h5"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontFamily: '"Nanum Myeongjo", serif',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                찰떡궁합
              </Typography>
            </Box>

            {/* 모바일 메뉴 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
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
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: 2,
                    mt: 1.5,
                    '& .MuiMenuItem-root': {
                      py: 1.5
                    }
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(139, 69, 19, 0.1)'
                      }
                    }}
                  >
                    <Typography textAlign="center" sx={{ fontWeight: 500 }}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* 로고 - 모바일 */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
              <SpaIcon sx={{ fontSize: 28, mr: 1, color: 'white' }} />
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontFamily: '"Nanum Myeongjo", serif',
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                찰떡궁합
              </Typography>
            </Box>

            {/* 데스크탑 메뉴 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'white', 
                    display: 'block',
                    py: 1,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* 로그인/프로필 메뉴 */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="프로필 메뉴 열기">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar 
                        alt={user?.username || 'User'} 
                        sx={{ 
                          bgcolor: theme.palette.secondary.main,
                          border: '2px solid white',
                        }}
                      >
                        {user?.username ? user.username.charAt(0).toUpperCase() : <AccountCircleIcon />}
                      </Avatar>
                    </IconButton>
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
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        borderRadius: 2,
                        minWidth: 180,
                      }
                    }}
                  >
                    <Box sx={{ py: 1, px: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user?.username || '사용자'}님
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email || ''}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem component={RouterLink} to="/profile" onClick={handleCloseUserMenu} sx={{ py: 1.5 }}>
                      <Typography textAlign="center">프로필</Typography>
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/favorites" onClick={handleCloseUserMenu} sx={{ py: 1.5 }}>
                      <Typography textAlign="center">내 즐겨찾기</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: theme.palette.error.main }}>
                      <Typography textAlign="center">로그아웃</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{ 
                    ml: 2, 
                    display: isMobile ? 'none' : 'block',
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: '1.5px',
                    px: 2.5,
                    py: 0.8,
                    borderRadius: 1.5,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  로그인
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      />
    </>
  );
}

export default Header;
