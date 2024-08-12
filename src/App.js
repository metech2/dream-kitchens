import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import './App.css'; // Import the CSS file
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
