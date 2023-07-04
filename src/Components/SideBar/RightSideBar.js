import { Box, ResponsiveContext, Button, Text } from 'grommet';
import LeftSideBarElement from './LeftSideBarElement';
import { useContext, useState, React } from 'react';
import { rightSideBarOptions } from '../../Config/RightSideBarOptions/rightSideBarOptions';
import { SearchBox } from './SearchBox';
import { useNavigate } from 'react-router-dom';
import { Previous, Next } from 'grommet-icons';
import RightSideBarElement from './RightSideBarElement';

const RightSideBar = (props) => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  const searchSuggestions = rightSideBarOptions;
  const [suggestions, setSuggestions] = useState(searchSuggestions);
  const [selected, setSelected] = useState(rightSideBarOptions[0].name);
  const navigateFunction = () => {
    props.setSelected(false);
    props.onExit(false);
    navigate(`/dashboard/Solution/${rightSideBarOptions[0].name}`);
  };
  const [selectedButton, setSelectedButton] = useState('Solution');

  const changeButton = (option) => {
    setSelectedButton(option);
  };
  return (
    <Box
      align='start'
      round='none'
      width={!['xsmall', 'small', 'medium'].includes(size) ? '16vw' : '150px'}
      border='left'
      height='100%'
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
          suggestions={rightSideBarOptions}
          setSuggestions={setSuggestions}
        />
      </Box>
      {rightSideBarOptions.map((element) => {
        return (
          <RightSideBarElement
            options={element.name}
            selected={selected}
            setSelected={setSelected}
          >
            {element.logo}
          </RightSideBarElement>
        );
      })}
    </Box>
  );
};

export default RightSideBar;
