import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskBoard } from './components/TaskBoard';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #232323, #1c1c1c)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #0f0f0f, #1c1c1c)' }}>
          <AppBar position="static" elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Toolbar>
              <AssignmentIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
              <Typography variant="h6" component="h1" sx={{ color: 'white', fontWeight: 600 }}>
                Task Management
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
            <TaskBoard />
          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
