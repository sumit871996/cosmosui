import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { Add, Target, Layer } from 'grommet-icons';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const LeftSideBarElement = (props) => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction='row-responsive'
      width='100%'
      border='bottom'
      pad='small'
      align='center'
      style={{
        border: props.selected == props.options && 'bottom',
      }}
      // justify='between'
    >
      <Box pad={{ right: 'small' }}>{props.children}</Box>

      <Box
        flex
        style={{
          borderRadius: '0px',
        }}
      >
        <Text weight='bold' color='#00567A'>
          {props.options}
        </Text>
      </Box>
      <Box
        onClick={() => {
          props.setSelected(props.options);
        }}
      >
        <Add onClick={props.addToolbarElement} color='black' />
      </Box>
    </Box>
  );
};

export default LeftSideBarElement;
