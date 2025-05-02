import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import PairingPage from './pages/PairingPage';
import LiquorPage from './pages/LiquorPage';
import LiquorDetailPage from './pages/LiquorDetailPage';
import IngredientPage from './pages/IngredientPage';
import IngredientDetailPage from './pages/IngredientDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// 주미당 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b4513', // 전통적인 주미당 브라운
      light: '#a05a2c',
      dark: '#6b3000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e63946', // 포인트 레드
      light: '#ff6b6b',
      dark: '#c1121f',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f4e3', // 베이지 배경
      paper: '#fff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Nanum Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: '"Nanum Myeongjo", serif',
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Function to handle login
  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ 
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, #ffffff 100%)`,
        minHeight: '100vh' 
      }}>
        <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <main style={{ minHeight: 'calc(100vh - 180px)', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pairing" element={<PairingPage />} />
            <Route path="/liquors" element={<LiquorPage />} />
            <Route path="/liquors/:id" element={<LiquorDetailPage />} />
            <Route path="/ingredients" element={<IngredientPage />} />
            <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
