
import {
  Grid,
  Box,
  Typography,
  List,
} from '@mui/material';

import RecipeMenu from './RecipeMenu';

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
  const { ctx, recipe } = props;


  return (
    <Box style={viewStyle}>
      <Grid container>
        <Grid size={{xs: 10, md: 11}} padding={1}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {recipe.name}
          </Typography>
        </Grid>
        <Grid size={{xs: 2, md: 1}} padding={1}>
          <RecipeMenu ctx={ctx} enableEdit={true}/>
        </Grid>
      </Grid>
      <List component="nav" aria-label="recipes">
        {recipe.ingredients.map((ingredient, i) => {
          const isEven = i & 0x1;
          const CellType = isEven ? EvenListItem : OddListItem;
          return (
            <CellType style={{ padding: "2px" }}>
              <Container container>
                <Grid size={{ xs: 1, md: 1 }}>
                  <AmountTypography sx={{ fontWeight: "bold" }}>
                    {
                      ingredient.amount.whole > 0 ? (
                        String(ingredient.amount.whole) + " "
                      ) : (
                        ""
                      )
                    }{
                      ingredient.amount.num > 0 ? (
                        ingredient.amount.num + "/" + ingredient.amount.dem
                      ) : (
                        ""
                      )
                    }
                  </AmountTypography>
                </Grid>
                <Grid size={{ xs: 2, md: 1 }}>
                  <UnitTypography sx={{ fontWeight: "bold" }}>
                    {ingredient.units}
                  </UnitTypography>
                </Grid>
                <Grid size={{ xs: 9, md: 10 }}>
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
