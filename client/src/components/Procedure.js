import {
  Grid,
  Box,
  Typography,
  List,
  ListItemText,
} from '@mui/material';

import RecipeMenu from './RecipeMenu';
import { viewStyle, EvenListItem, OddListItem } from "./Styled"


function Procedure(props) {
  const { ctx, recipe } = props;
  return (
    <Box style={viewStyle}>
      <Grid container>
        <Grid size={{ xs: 10, md: 11 }} padding={1}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {recipe.name}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2, md: 1 }} padding={1}>
          <RecipeMenu ctx={ctx} enableEdit={true} />
        </Grid>
      </Grid>

      <List component="nav" aria-label="recipes">
        {recipe.procedure.map((step, i) => {
          const isEven = i & 0x1;
          const CellType = isEven ? EvenListItem : OddListItem;
          return (
            <CellType>
              <ListItemText primary={(i + 1) + ": " + step} />
            </CellType>
          );
        })}
      </List>
    </Box >
  );
}

export default Procedure;
