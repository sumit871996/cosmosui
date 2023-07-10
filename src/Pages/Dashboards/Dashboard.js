import { Box, ResponsiveContext } from 'grommet';
import { React, useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/SideBar/LeftSideBar';
import BreadCrums from '../../components/BreadCrumb/BreadCrumb';
import { Button, Layer } from 'grommet';
import { getURL } from '../../Utils/commonUtils';
import { useLocation } from 'react-router-dom';
import DashboardWindow from '../../components/DashboardWindows/Data/DataMigrationWindow';
import { dept } from '../../Config/dataMigrationOptions';
import ToolBar from '../../components/ToolBar/ToolBar';
import DataMigrationWindow from '../../components/DashboardWindows/Data/DataMigrationWindow';
import DashboardContext from './DashboardContext';
import Chatbot from 'src/components/Chatbot/Chatbot';
const Dashboard = (props) => {
  const [selectedDashboard, setSelectedDashboard] = useState();

  const location = useLocation();
  // const ctx = useContext(DashboardContext);

  const size = useContext(ResponsiveContext);
  return (
    <DashboardContext.Provider
      value={{
        selectedDashboard: selectedDashboard,
        setSelectedDashboard: setSelectedDashboard,
      }}
    >
      <Box flex>
        <ToolBar />

        <Box
          border='top'
          flex
          direction='row-responsive'
          overflow={{ vertical: 'scroll' }}
        >
          {props.children}
        </Box>
      </Box>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
