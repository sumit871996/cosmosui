import Chatbot from 'src/components/Chatbot/Chatbot';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ResponsiveContext, Text } from 'grommet';

import { Grommet } from 'grommet';

import { hpe } from 'grommet-theme-hpe';
import AppRoutes from './Routes/AppRoutes';
import { AppFooter } from './components/Footer/AppFooter';
import NavBar from './components/NavBar/NavBar';
import { useContext } from 'react';
const App = () => {
    return (
        <Grommet theme={hpe} full>
      {/* <Box height='100vh'> */}
        <NavBar />
        <Box flex>
          <AppRoutes />
        </Box>
        <AppFooter />
      {/* </Box> */}
    </Grommet>

    );
};

export default App;
