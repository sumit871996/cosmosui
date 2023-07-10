import { Box } from 'grommet';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from '../Pages/Authentication/LoginPage';
import Dashboard from '../Pages/Dashboards/Dashboard';

import DataTransformationWindow from '../components/DashboardWindows/Data/DataTransformationWindow';
import DataMigrationWindow from '../components/DashboardWindows/Data/DataMigrationWindow';
import DataDashboard from '../components/DashboardWindows/Data/DataDashboard';
import AimlDashboard from '../components/DashboardWindows/AIML/AimlDashboard';
import JointPage from '../Pages/JointPage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path='/'></Route>
      <Route element={<JointPage />} path='/joint'></Route>

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
