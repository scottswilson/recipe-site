import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';

import SwipeableViews from 'react-swipeable-views';

import RecipeList from "./RecipeList"
import Ingredients from "./Ingredients"
import Procedure from "./Procedure"
import {getEmptyRecipe, sampleRecipes} from "./Common"

function TabView(props) {
  const { ctx } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };


  const onNewTab = (e, newValue) => {
    ctx.tab.set(newValue);
  };

  const onNewTabSwipe = (newValue) => {
    ctx.tab.set(newValue);
  };

  const selectedRecipe = ctx.recipes.value.filter((recipe) => {
    return recipe.id === ctx.selectedId.value;
  })[0] || getEmptyRecipe();

  const barStyle = {
    maxHeight: 'calc(48px)',
    overflow: "auto"
  };

  return (
    <Box>
      <AppBar position="static" style={barStyle}>
        <Tabs
          value={ctx.tab.value}
          onChange={onNewTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recipes" {...a11yProps(0)} />
          <Tab label="Ingredients" {...a11yProps(1)} />
          <Tab label="Steps" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews index={ctx.tab.value} onChangeIndex={onNewTabSwipe}>
        <RecipeList ctx={ctx}/>
        <Ingredients ctx={ctx} recipe={selectedRecipe} />
        <Procedure ctx={ctx} recipe={selectedRecipe} />
      </SwipeableViews>

    </Box>
  );
}

export default TabView;
