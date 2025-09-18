import React, { useState } from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styled from "styled-components";

const LabelGrid = styled(Grid)`
  color: #ff0000ff;
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
    <Box>
      <Typography variant="h5">{recipe.name}</Typography>
      {recipe.ingredients.map(ingredient => (
        <Grid container>
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
        </Grid>
      ))}
    </Box>
  );
}

export default Ingredients;
