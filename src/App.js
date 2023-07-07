import logo from './logo.svg';
import './App.css';
import { Box, Button, ResponsiveContext, Text } from 'grommet';

import { Grommet } from 'grommet';

import { hpe } from 'grommet-theme-hpe';
import AppRoutes from './Routes/AppRoutes';
import { AppFooter } from './Components/Footer/AppFooter';
import NavBar from './Components/NavBar/NavBar';
import { useContext } from 'react';

function App() {
  const size = useContext(ResponsiveContext);
  return (
    <Grommet theme={hpe} full>
      <Box height='100vh'>
        <NavBar />
        <Box flex>
          <AppRoutes />
        </Box>
        <AppFooter />
      </Box>
    </Grommet>
  );
}

export default App;
