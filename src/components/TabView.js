import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';

import SwipeableViews from 'react-swipeable-views';

import RecipeList from "./RecipeList"
import Ingredients from "./Ingredients"
import Procedure from "./Procedure"


function TabView(props) {
  const { recipes } = props;

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const [recipeIndex, setRecipeIndex] = useState(0);
  const [tab, setTab] = useState(0);

  const onNewTab = (e, newValue) => {
    setTab(newValue);
  };
  const onNewTabSwipe = (newValue) => {
    setTab(newValue);
  };

  return (
      <Box>
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={onNewTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            valie={tab}
          >
            <Tab label="Recipe List" {...a11yProps(0)} />
            <Tab label="Ingredients" {...a11yProps(1)} />
            <Tab label="Procedure" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews index={tab} onChangeIndex={onNewTabSwipe}>
          <RecipeList recipes={recipes} index={recipeIndex} setIndex={setRecipeIndex} setTab={setTab}/>
          <Ingredients recipe={recipes[recipeIndex]}/>
          <Procedure recipe={recipes[recipeIndex]}/>
        </SwipeableViews>

      </Box>
  );
}

export default TabView;
