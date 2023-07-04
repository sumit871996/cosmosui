import {
  Box,
  Card,
  Text,
  TextArea,
  Grid,
  Button,
  ResponsiveContext,
} from 'grommet';
import { dataTransformationOptions } from '../../../Config/dataTransformationOptions';
import LeftSideBar from '../../SideBar/LeftSideBar';
import RightSideBar from '../../SideBar/RightSideBar';
import { useContext } from 'react';
import DashboardContext from '../../../Pages/Dashboards/DashboardContext';
const DataTransformationWindow = () => {
  const ctx = useContext(DashboardContext);
  const size = useContext(ResponsiveContext);
  return (
    <Box direction='row-responsive' fill='horizontal'>
      <LeftSideBar
        sidebaroptions={dataTransformationOptions}
        title='Data Migration'
      />

      <Box direction='column' justify='center' align='center' flex>
        <Box
          background='#00739D'
          fill='horizontal'
          border='bottom'
          justify='center'
          align='start'
        >
          menubar + {ctx.selectedDashboard}
        </Box>
        <Box width='100%' direction='row' fill='vertical'>
          <Box background='#F7F7F7' align='center' flex border='right'>
            <Text>Source</Text>
          </Box>
          <Box background='#F7F7F7' align='center' flex>
            Transformation
          </Box>
          <Box background='#F7F7F7' align='center' flex border='left'>
            <Text>Destination</Text>
          </Box>
        </Box>
      </Box>
      <RightSideBar />
    </Box>
  );
};

export default DataTransformationWindow;
