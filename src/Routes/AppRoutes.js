import { Box } from 'grommet';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from '../Pages/Authentication/LoginPage';
import Dashboard from '../Pages/Dashboards/Dashboard';

import DataTransformationWindow from '../Components/DashboardWindows/Data/DataTransformationWindow';
import DataMigrationWindow from '../Components/DashboardWindows/Data/DataMigrationWindow';
import DataDashboard from '../Components/DashboardWindows/Data/DataDashboard';
import AimlDashboard from '../Components/DashboardWindows/AIML/AimlDashboard';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path='/'></Route>
      <Route
        element={
          <Dashboard>
            <DataDashboard />
          </Dashboard>
        }
        path='/data/dashboard'
      />
      <Route
        element={
          <Dashboard>
            <DataMigrationWindow />
          </Dashboard>
        }
        path='/Data/Data Migration'
      />
      <Route
        element={
          <Dashboard>
            <DataTransformationWindow />
          </Dashboard>
        }
        path='/Data/Data Transformation'
      />
      <Route
        element={
          <Dashboard>
            <AimlDashboard />
          </Dashboard>
        }
        path='/AI/ML/dashboard'
      />

      <Route
        element={
          <Dashboard>
            <AimlDashboard />
          </Dashboard>
        }
        path='/Visualization/dashboard'
      />
    </Routes>
  );
};

export default AppRoutes;
