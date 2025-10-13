import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  TextField,
  ListItemButton,
  Button,
  CircularProgress,
} from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import styled from "styled-components";

import { viewStyle } from "./Styled"
import {
  getRecipesSchema,
  newRecipeSchema,
} from "./Schema"

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
    filter: opacity(0.5);
  }
`;

function RecipeList(props) {
  const { ctx, setTab } = props;

  const [searchText, setSearchText] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [busy, setBusy] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState([]);

  const numCols = Math.ceil(width / 150);

  const changeRecipe = (id) => {
    ctx.selectedId.set(id);
    setTab(1);
  };

  const onNewRecipe = () => {
    setBusy(true);

    const cbSuccess = (id) => {
      return () => {
        setTab(3);
        ctx.selectedId.set(id);
      }
    };

    const cbFinally = () => {
      setBusy(false);
    };

    newRecipeSchema(ctx, cbFinally, cbSuccess);
  };

  const updateSearch = (newText) => {
    setSearchText(newText);
    const searchText = newText.toLowerCase();
    const filteredRecipes = ctx.recipes.value.filter((recipe) => {
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

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    getRecipesSchema(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateSearch(searchText);
  }, [ctx.recipes.value]);

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
      <ImageList cols={numCols} gap={0} style={{ margin: "0px" }}>
        {visibleRecipes.map((recipe) => (
          <ImageListItem>

            <MyListButton
              selected={ctx.selectedId.value === recipe.id}
              onClick={() => changeRecipe(recipe.id)}
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
      <Button
        variant="outlined"
        onClick={onNewRecipe}
        fullWidth
        disabled={busy}
      >
        {busy ? <CircularProgress size={24} /> : "Add Recipe"}
      </Button>
    </Box>
  );
}

export default RecipeList;
