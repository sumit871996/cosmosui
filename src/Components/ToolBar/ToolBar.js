import React, { useContext } from 'react';
import { ResponsiveContext } from 'grommet';
import { Box, Text, Button } from 'grommet';
import { AppsRounded } from 'grommet-icons';
import toolbarElemnts from './toolbarElements';
import { useNavigate } from 'react-router-dom';
import DashboardContext from '../../Pages/Dashboards/DashboardContext';
const ToolBar = () => {
  const size = React.useContext(ResponsiveContext);
  const ctx = useContext(DashboardContext);
  const navigate = useNavigate();
  return (
    <Box
      // height={!['xsmall', 'small', 'medium'].includes(size) ? '' : '100%'}
      // fill='vertical'
      direction='row-responsive'
      pad='xxsmall'
      // flex
    >
      <Box
        fill='horizontal'
        flex
        direction='row-responsive'
        align='center'
        justify='start'
      >
        <Button
          // active={ctx.selectedDashboard == el.title}
          weight='bold'
          color='black'
          size='small'
          label='Dashboard'
          alignSelf='center'
          icon={<AppsRounded />}
          onClick={() => {
            // ctx.setSelectedDashboard(el.title);
            // navigate(`/${el.title}/dashboard`);
          }}
        />
        {toolbarElemnts.map((el) => (
          <Button
            active={ctx.selectedDashboard == el.title}
            weight='bold'
            color='black'
            size='small'
            label={el.title}
            alignSelf='center'
            icon={el.logo}
            onClick={() => {
              ctx.setSelectedDashboard(el.title);
              navigate(`/${el.title}/dashboard`);
            }}
          />
        ))}
      </Box>
      {/* <Box justify='center' align='end'> */}

      {/* </Box> */}
    </Box>
  );
};

export default ToolBar;
