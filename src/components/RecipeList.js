import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import styled from "styled-components";

import { viewStyle } from "./Styled"

const SearchBox = styled(Box)`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const MyListButton = styled(ListItemButton)`
  padding: 0px !important;
  &:hover {
    background: #bcc2e2ff;
  }
`;

const MyImage = styled.img`
  &:hover {
    filter: brightness(1.25);
  }
`;

function RecipeList(props) {

  const [searchText, setSearchText] = useState("");

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const numCols = Math.ceil(width / 150);

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
      <ImageList cols={numCols} gap={0} style={{margin: "0px"}}>
        {visibleRecipes.map((recipe) => (
          <ImageListItem>
            
          <MyListButton
            selected={index === recipe.index}
            onClick={() => changeRecipe(recipe.index)}
            width="100%"
          >
            <MyImage
              src={require(`../images/${recipe.image}`)}
              alt={recipe.name}
              loading="lazy"
              width="100%"
              style={{ aspectRatio: 1 }}
            />
            <ImageListItemBar
              title={recipe.name}
            />
          </MyListButton>

          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default RecipeList;
