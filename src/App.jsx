import './App.css'
import  CssBaseline  from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Board from './pages/Board';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function App() {
  const theme = createTheme({
    palette: {mode: 'light'}
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout/>}>
            <Route index element={<Home/>} />
          </Route>
          <Route path='/board' element={<AppLayout/>}>
            <Route index element={<Board/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
