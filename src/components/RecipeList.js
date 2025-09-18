import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import styled from "styled-components";

import { viewStyle } from "./Styled"

const SearchBox = styled(Box)`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

function RecipeList(props) {

  const [searchText, setSearchText] = useState("");

  const { recipes, index, setIndex, setTab } = props;
  const changeRecipe = (i) => {
    setIndex(i);
    setTab(1);
  };

  const numberedRecipes = recipes.map((recipe, i) => {
    return {
      "index": i,
      ...recipe
    };
  })

  const [visibleRecipes, setVisibleRecipes] = useState(numberedRecipes);

  const updateSearch = (newText) => {
    setSearchText(newText);
    const searchText = newText.toLowerCase();
    const filteredRecipes = numberedRecipes.filter((recipe) => {
      const inName = recipe.name.toLowerCase().includes(searchText);
      const inIngredients = recipe.ingredients.some(ingredient => {
        return ingredient.label.toLowerCase().includes(searchText);
      });
      const inProcedure = recipe.procedure.some(step => {
        return step.toLowerCase().includes(searchText);
      });
      const inTags = recipe.tags.some(tag => {
        return tag.toLowerCase().includes(searchText);
      });
      return inName | inIngredients | inProcedure | inTags;
    });
    setVisibleRecipes(filteredRecipes);
  };

  return (
    <Box style={viewStyle}>
      <SearchBox>
        <TextField
          id="standard-basic"
          label="Search"
          type="search"
          fullWidth
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateSearch(event.target.value);
          }}
        />
      </SearchBox>
      <List component="nav" aria-label="recipes">
        {visibleRecipes.map(recipe => (
          <ListItemButton
            selected={index === recipe.index}
            onClick={() => changeRecipe(recipe.index)}
          >
            <ListItemText primary={recipe.name} />
          </ListItemButton>
        ))}
      </List>

    </Box>
  );
}

export default RecipeList;
