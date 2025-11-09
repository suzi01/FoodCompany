import { MantineProvider } from '@mantine/core';
import './App.css';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <MantineProvider>
      {/* {<h1 className="text-3xl font-bold underline">Hello world!</h1>} */}
      <Layout />
    </MantineProvider>
  );
}

export default App;
