import { Box, ResponsiveContext } from 'grommet';
import { React, useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../Components/SideBar/LeftSideBar';
import BreadCrums from '../../Components/BreadCrumb/BreadCrumb';
import { Button, Layer } from 'grommet';
import { getURL } from '../../Utils/commonUtils';
import { useLocation } from 'react-router-dom';
import DashboardWindow from '../../Components/DashboardWindows/Data/DataMigrationWindow';
import { dept } from '../../Config/dataMigrationOptions';
import ToolBar from '../../Components/ToolBar/ToolBar';
import DataMigrationWindow from '../../Components/DashboardWindows/Data/DataMigrationWindow';
import DashboardContext from './DashboardContext';
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
