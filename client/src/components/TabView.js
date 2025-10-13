import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';

import SwipeableViews from 'react-swipeable-views';

import RecipeList from "./RecipeList"
import Ingredients from "./Ingredients"
import Procedure from "./Procedure"
import EditRecipe from "./EditRecipe/EditRecipe"
import {getEmptyRecipe} from "./Common"

function TabView(props) {
  const { ctx } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const [tab, setTab] = useState(0);

  const onNewTab = (e, newValue) => {
    setTab(newValue);
  };
  const onNewTabSwipe = (newValue) => {
    setTab(newValue);
  };

  const selectedRecipe = ctx.recipes.value.filter((recipe) => {
    return recipe.id === ctx.selectedId.value;
  })[0] || getEmptyRecipe();

  const barStyle = {
    maxHeight: 'calc(48px)',
    overflow: "auto"
  };

  const viewStyle = {
    maxHeight: 'calc(100vh - 48px)',
    overflow: "auto"
  };

  return (
    <Box>
      <AppBar position="static" style={barStyle}>
        <Tabs
          value={tab}
          onChange={onNewTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          valie={tab}
        >
          <Tab label="Recipes" {...a11yProps(0)} />
          <Tab label="Ingredients" {...a11yProps(1)} />
          <Tab label="Steps" {...a11yProps(2)} />
          <Tab label="Edit" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews index={tab} onChangeIndex={onNewTabSwipe} style={viewStyle}>
        <RecipeList ctx={ctx} setTab={setTab} />
        <Ingredients recipe={selectedRecipe} />
        <Procedure recipe={selectedRecipe} />
        <EditRecipe setTab={setTab} recipe={selectedRecipe} ctx={ctx}/>
      </SwipeableViews>

    </Box>
  );
}

export default TabView;
