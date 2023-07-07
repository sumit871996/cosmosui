import {
  Box,
  ResponsiveContext,
  Button,
  Text,
  Menu,
  AccordionPanel,
  Accordion,
} from 'grommet';
import LeftSideBarElement from './LeftSideBarElement';
import { useContext, useState, React } from 'react';
import { rightSideBarOptions } from '../../Config/RightSideBarOptions/rightSideBarOptions';
import { SearchBox } from './SearchBox';
import { useNavigate } from 'react-router-dom';
import { Previous, Next, CatalogOption, Folder, FormDown } from 'grommet-icons';

const RightSideBar = (props) => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  // const searchSuggestions = rightSideBarOptions;
  // const [suggestions, setSuggestions] = useState(searchSuggestions);
  // const [selected, setSelected] = useState(rightSideBarOptions[0].name);
  // const navigateFunction = () => {
  //   props.setSelected(false);
  //   props.onExit(false);
  //   navigate(`/dashboard/Solution/${rightSideBarOptions[0].name}`);
  // };
  const [selectedButton, setSelectedButton] = useState('Solution');

  const changeButton = (option) => {
    setSelectedButton(option);
  };
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];
  return (
    <Box
      align='start'
      round='none'
      width={!['xsmall', 'small', 'medium'].includes(size) ? '16vw' : '150px'}
      border='all'
      height='100%'
      fill='vertical'
    >
      <Box
        align='start'
        width='100%'
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
      >
        <Box fill='horizontal' direction='row-responsive' justify='between'>
          <Button
            width={
              !['xsmall', 'small', 'medium'].includes(size) ? '20vw' : '200px'
            }
            height='30px'
            justify='center'
            alignSelf='center'
            label='Solution'
            onClick={() => {
              changeButton('Solution');
            }}
            active={selectedButton == 'Solution' ? true : false}
          />
          <Button
            width={
              !['xsmall', 'small', 'medium'].includes(size) ? '20vw' : '200px'
            }
            height='30px'
            justify='center'
            alignSelf='center'
            label='Team'
            onClick={() => {
              changeButton('Team');
            }}
            active={selectedButton == 'Team' ? true : false}
          />
        </Box>
        <SearchBox
          placeholder='Search'
          // suggestions={rightSideBarOptions}
          // setSuggestions={setSuggestions}
        />
      </Box>
      <Box
        align='center'
        direction='row-responsive'
        pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      >
        <CatalogOption color='#00567A' />
        <Box
          onClick={() => {}}
          flex
          align='center'
          fill='horizontal'
          pad={{ left: 'xsmall' }}
        >
          <Text color='#00567A'>Project.params</Text>
        </Box>
      </Box>
      <Box
        onClick={() => {}}
        align='center'
        direction='row-responsive'
        pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      >
        <Folder color='#00567A' />
        <Box flex align='center' fill='horizontal' pad={{ left: 'xsmall' }}>
          <Text color='#00567A'>Connection managers</Text>
        </Box>
      </Box>
      <Accordion color='#00567A' fill='horizontal'>
        <AccordionPanel label='Packages'>
          <Box background='light-2'>
            <Text color='#00567A'>Create package</Text>
          </Box>
        </AccordionPanel>
      </Accordion>
      {/* {rightSideBarOptions.map((element) => {
        return ( */}
      {/* <RightSideBarElement
            options={element.name}
            selected={selected}
            setSelected={setSelected}
          >
            {element.logo}
          </RightSideBarElement> */}
      {/* );
      })} */}
    </Box>
  );
};

export default RightSideBar;
