import {
  Box,
  Card,
  Text,
  TextArea,
  Grid,
  Button,
  ResponsiveContext,
} from 'grommet';
import Chatbot from 'src/components/Chatbot/Chatbot';
import { dataMigrationOptions } from '../../../Config/dataMigrationOptions';
import JointPage from '../../../Pages/JointPage';
import LeftSideBar from '../../SideBar/LeftSideBar';
import RightSideBar from '../../SideBar/RightSideBar';
import { useContext, useState } from 'react';
import DashboardContext from '../../../Pages/Dashboards/DashboardContext';
import { Close, FormClose } from 'grommet-icons';
const DataMigrationWindow = () => {
  const ctx = useContext(DashboardContext);
  const size = useContext(ResponsiveContext);
  const [toolbarProjects, setToolbarProjects] = useState([]);
  const addToolbarElement = () => {
    setToolbarProjects((project) => [...project, 'Project 1']);
  };
  const removeToolbarElement = () => {
    setToolbarProjects((project) => {
      let a = [];
      for (let i = 0; i < project.length - 1; i++) {
        a.push(project[i]);
      }
      return a;
    });
    console.log(toolbarProjects.splice(-1, 1));
  };
  return (
    <Box direction='row-responsive' fill='horizontal' flex height='70vh'>
      {/* <LeftSideBar
        addToolbarElement={addToolbarElement}
        sidebaroptions={dataMigrationOptions}
        title='Data Migration'
      /> */}

      <Box direction='column' justify='center' align='center' flex>
        {/* <Box
          background='#00739D'
          fill='horizontal'
          border='bottom'
          justify='start'
          align='start'
          direction='row-responsive'
          height='24px'
        >
          {toolbarProjects.map((el) => {
            return (
              <Box
                direction='row-responsive'
                background='white'
                align='center'
                pad={{ horizontal: 'small' }}
                gap='small'
                border={{ color: 'black', side: 'right' }}
              >
                {el}
                <Box onClick={removeToolbarElement}>
                  <FormClose />
                </Box>
              </Box>
            );
          })}
        </Box> */}
        {/* <Box width='100%' direction='row' fill='vertical'>
          <Box background='#F7F7F7' align='center' flex border='right'>
            <Text>Source</Text>
            <JointPage title='Source 1' />
          </Box>
          <Box background='#F7F7F7' align='center' flex>
            <Text>Destination</Text>
            <JointPage title='Destination 1' />
          </Box>
        </Box> */}
        <Box className='chatbot'>
          <Chatbot />
        </Box>
      </Box>

      <RightSideBar />
    </Box>
  );
};

export default DataMigrationWindow;
