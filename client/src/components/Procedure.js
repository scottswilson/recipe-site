import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

import {viewStyle, EvenListItem, OddListItem} from "./Styled"


function Procedure(props) {
  const { recipe } = props;
  return (
    <Box style={viewStyle}>
      <Typography variant="h5" style={{textAlign:"center"}}>
        {recipe.name}
      </Typography>

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
