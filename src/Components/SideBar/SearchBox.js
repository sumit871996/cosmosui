// SearchExample.js
import React from 'react';
import styled from 'styled-components';
import { TextInput, Box } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

// Inputs should always be accompanied by labels for accessibility. An icon
// may serve as a label if 1) the icon meaning is well understood, and 2)
// has an 'aria-labelledby' attribute. For additional detail:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const SearchBox = ({ ...props }) => {
  const [value, setValue] = React.useState();
  const searchSuggestions = props.suggestions;
  // const [suggestions, setSuggestions] = React.useState(
  //   searchSuggestions.slice(0, 5)
  // );
  const filterResults = (query) => {
    let resultSet;
    if (query) {
      const regexp = new RegExp(query, 'i');
      resultSet = searchSuggestions.filter((option) => regexp.test(option));
    } else {
      resultSet = searchSuggestions;
    }
    return resultSet.slice();
  };

  const onChange = (event) => {
    // console.log(props.suggestions);
    const {
      target: { value: nextValue },
    } = event;
    const nextSuggestions = filterResults(nextValue);

    setValue(nextValue);
    props.setSuggestions(nextSuggestions);
  };

  return (
    <Box fill='horizontal' height='30px' pad={{ top: '10px', bottom: '40px' }}>
      <StyledTextInput
        icon={<SearchIcon id='search-icon' style={{ justifyItems: 'start' }} />}
        placeholder={props.placeholder}
        value={value}
        suggestions={searchSuggestions}
        onChange={onChange}
        type='search'
        {...props}
      />
    </Box>
  );
};
