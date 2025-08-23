import { MantineProvider } from '@mantine/core';
import './App.css';

function App() {
  return (
    <MantineProvider>
      {<h1 className="text-3xl font-bold underline">Hello world!</h1>}
    </MantineProvider>
  );
}

export default App;
