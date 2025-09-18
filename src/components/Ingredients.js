import React, { useState } from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

import styled from "styled-components";

import { viewStyle, EvenListItem, OddListItem } from "./Styled"

const Container = styled(Grid)`
  width:100%;
`;

const AmountTypography = styled(Typography)`
  color: #ff0000ff;
  text-align: justify;
  text-align-last: right;
`;

const UnitTypography = styled(AmountTypography)`
  text-align-last: center;
`;

const IngredientTypography = styled(Typography)`
  text-align-last: left;
`;

function Ingredients(props) {
  const { recipe } = props;


  return (
    <Box style={viewStyle}>
      <Typography variant="h5">{recipe.name}</Typography>
      <List component="nav" aria-label="recipes">
        {recipe.ingredients.map((ingredient, i) => {
          const isEven = i & 0x1;
          const CellType = isEven ? EvenListItem : OddListItem;
          return (
            <CellType fullWidth>
              <Container container>
                <Grid item size={{ xs: 1, md: 1 }}>
                  <AmountTypography sx={{ fontWeight: "bold" }}>
                    {ingredient.amount}
                  </AmountTypography>
                </Grid>
                <Grid item size={{ xs: 2, md: 1 }}>
                  <UnitTypography sx={{ fontWeight: "bold" }}>
                    {ingredient.units}
                  </UnitTypography>
                </Grid>
                <Grid item size={{ xs: 9, md: 10 }}>
                  <IngredientTypography>
                    {ingredient.label}
                  </IngredientTypography>
                </Grid>
              </Container>
            </CellType>
          );
        })}
      </List>
    </Box>
  );
}

export default Ingredients;
