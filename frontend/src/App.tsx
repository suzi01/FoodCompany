import { MantineProvider } from '@mantine/core';
import './App.css';
import { Router } from './pages/Routes';

function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}

export default App;
