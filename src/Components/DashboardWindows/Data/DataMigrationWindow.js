import {
  Box,
  Card,
  Text,
  TextArea,
  Grid,
  Button,
  ResponsiveContext,
} from 'grommet';
import { dataMigrationOptions } from '../../../Config/dataMigrationOptions';
import JointPage from '../../../Pages/JointPage';
import LeftSideBar from '../../SideBar/LeftSideBar';
import RightSideBar from '../../SideBar/RightSideBar';
import { useContext } from 'react';
import DashboardContext from '../../../Pages/Dashboards/DashboardContext';
const DataMigrationWindow = () => {
  const ctx = useContext(DashboardContext);
  const size = useContext(ResponsiveContext);
  return (
    <Box direction='row-responsive' fill='horizontal'>
      <LeftSideBar
        sidebaroptions={dataMigrationOptions}
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
            <JointPage title='Source 1' />
          </Box>
          <Box background='#F7F7F7' align='center' flex>
            <Text>Destination</Text>
            <JointPage title='Destination 1' />
          </Box>
        </Box>
      </Box>

      <RightSideBar />
    </Box>
  );
};

export default DataMigrationWindow;
