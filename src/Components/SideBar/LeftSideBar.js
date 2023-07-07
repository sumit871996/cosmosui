import { Box, ResponsiveContext, Button, Text } from 'grommet';
import LeftSideBarElement from './LeftSideBarElement';
import { useContext, useState, React } from 'react';
import { SearchBox } from './SearchBox';
import { useNavigate } from 'react-router-dom';
import { Previous, Next, Target, Layer } from 'grommet-icons';

const LeftSideBar = (props) => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  const searchSuggestions = props.sidebaroptions;
  const [suggestions, setSuggestions] = useState(() => {
    let a = [];
    props.sidebaroptions.map((el) => {
      a.push(el.name);
    });
    return a;
  });

  const [selected, setSelected] = useState(props.sidebaroptions[0].name);
  const navigateFunction = () => {
    props.setSelected(false);
    props.onExit(false);
    navigate(`/dashboard/Solution/${props.sidebaroptions[0].name}`);
  };

  return (
    <Box
      align='start'
      round='none'
      width={!['xsmall', 'small', 'medium'].includes(size) ? '16vw' : '150px'}
      border='all'
      height='100%'
    >
      <Box
        align='start'
        width='100%'
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
      >
        <Button
          gap='small'
          label='Back'
          icon={<Previous />}
          onClick={() => {
            navigate('/data/dashboard');
          }}
        />
        <Box>
          <Text color='black' weight='bold' size='large'>
            {props.title}
          </Text>
          <Text margin={{ vertical: 'xsmall' }} size='xsmall'>
            Add or drag below options
          </Text>
        </Box>

        <SearchBox
          placeholder='Search Toolbox'
          suggestions={searchSuggestions}
          setSuggestions={setSuggestions}
        />
      </Box>

      <LeftSideBarElement
        options={'Source 1'}
        addToolbarElement={props.addToolbarElement}
        selected={selected}
        setSelected={setSelected}
      >
        <Layer color='#00567A' />
      </LeftSideBarElement>
      <LeftSideBarElement
        options={'Target 1'}
        // addToolbarElement={props.addToolbarElement}
        selected={selected}
        setSelected={setSelected}
      >
        <Target color='#00567A' />
      </LeftSideBarElement>
    </Box>
  );
};

export default LeftSideBar;
