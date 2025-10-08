import { useState } from "react";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import NewIngredients from "./NewIngredients";
import NewProcedure from "./NewProcedure";
import { TextField } from "@mui/material";


function NewRecipe(props) {

  const exampleIngredient = [
    {
      "label": "meat, ground",
      "amount": { "whole": 2, "num": 0, "dem": 1 },
      "units": "lbs.",
    }, {
      "label": "large onion, chopped",
      "amount": { "whole": 0, "num": 1, "dem": 2 },
      "units": "",
    },
  ]

  const [ingredients, setIngredients] = useState(exampleIngredient);
  const [procedure, setProcedure] = useState([]);

  return (
    <Grid container>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          New Recipe
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <TextField
          label="Recipe Name"
          fullWidth
          variant="filled"
        />
        <TextField
          label="Servings"
          fullWidth
          variant="filled"
          type="number"
        />
      </Grid>
      <Paper size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Ingredients
        </Typography>
        <NewIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
          />
        </Paper>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Procedure
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <NewProcedure
          procedure={procedure}
          setProcedure={setProcedure}
        />
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Tags
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <NewProcedure
          procedure={procedure}
          setProcedure={setProcedure}
        />
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Image
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <input type="file" onChange={() => {}} />
      </Grid>
    </Grid>
  );
}

export default NewRecipe;
