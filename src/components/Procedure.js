import React, { useState } from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function Procedure(props) {
  const { recipe } = props;
  return (
    <Box>
      <Typography variant="h5">{recipe.name}</Typography>


      <List component="nav" aria-label="recipes">
        {recipe.procedure.map((step, i) => (
          <ListItemButton>
            <ListItemText primary={(i + 1) + ": " + step} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Procedure;
