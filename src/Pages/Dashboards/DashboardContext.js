import React from 'react';

const DashboardContext = React.createContext({
  selectedDashboard: Boolean,
  setSelectedDashboard: () => {},
});

export default DashboardContext;
