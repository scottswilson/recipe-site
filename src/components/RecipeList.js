import { useState } from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import styled from "styled-components";

const SearchBox = styled(Box)`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

function RecipeList(props) {
  const { recipes, index, setIndex, setTab } = props;
  const changeRecipe = (i) => {
    setIndex(i);
    setTab(1);
  };
  return (
    <Box>
      <SearchBox>
        <TextField id="standard-basic" label="Search" type="search" fullWidth />
      </SearchBox>
      <List component="nav" aria-label="recipes">
        {recipes.map((recipe, i) => (
          <ListItemButton
            selected={index === i}
            onClick={() => changeRecipe(i)}
          >
            <ListItemText primary={recipe.name} />
          </ListItemButton>
        ))}
      </List>

    </Box>
  );
}

export default RecipeList;
