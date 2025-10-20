import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  TextField,
  ListItemButton,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

import styled from "styled-components";

import RecipeMenu from './RecipeMenu';
import {
  newRecipeSchema,
} from "./Schema"
import { viewStyle } from "./Styled"

import testImg from '../images/test.webp?inline';


const MyListButton = styled(ListItemButton)`
  padding: 0px !important;

  &.Mui-selected div.MuiImageListItemBar-root {
    background-color: #ffffffda;
    height: 35%;
  }

  div.MuiImageListItemBar-titleWrap {
    padding: 10px;
    padding-left: 3px;
    padding-right: 3px;
  }

  &.Mui-selected div.MuiImageListItemBar-subtitle {
    color: black;
    font-weight: bolder;
  }
`;

const MyImage = styled.img`
  &:hover {
    filter: opacity(0.5);
  }
`;

function RecipeList(props) {
  const { ctx } = props;

  const [searchText, setSearchText] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [visibleRecipes, setVisibleRecipes] = useState([]);

  const numCols = Math.ceil(width / 150);

  const changeRecipe = (id) => {
    ctx.selectedId.set(id);
    ctx.tab.set(1);
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateSearch(searchText);
  }, [ctx.recipes.value]);

  return (
    <Box style={viewStyle}>
      <Grid container>
        <Grid size={{xs: 10, md: 11}} padding={1}>
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
        </Grid>
        <Grid size={{xs: 2, md: 1}}  padding={1}>
          <RecipeMenu ctx={ctx} enableNew={true} />
        </Grid>
      </Grid>


      <ImageList cols={numCols} gap={0} style={{ margin: "0px" }}>
        {visibleRecipes.map((recipe) => {

          const imgText = recipe.image.startsWith("data:image/webp;base64,") ? recipe.image : testImg;
          const isSelected = ctx.selectedId.value === recipe.id;
          return (
            <ImageListItem key={recipe.id}>

              <MyListButton
                className={isSelected ? "selected" : ""}
                selected={isSelected}
                onClick={() => changeRecipe(recipe.id)}
                width="100%"
              >
                <MyImage
                  src={imgText}
                  alt={recipe.name}
                  loading="lazy"
                  width="100%"
                  style={{ aspectRatio: 1 }}
                />
                <ImageListItemBar
                  subtitle={recipe.name}
                />
              </MyListButton>

            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
  );
}

export default RecipeList;
