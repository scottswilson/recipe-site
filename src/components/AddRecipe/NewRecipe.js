import { useState } from "react";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField, Button } from "@mui/material";

import NewIngredients from "./NewIngredients";
import NewProcedure from "./NewProcedure";
import AddTags from "./AddTags";

import { numericProps } from "../Common"

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

  const [recipeName, setRecipeName] = useState("Shit Sandwich");
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState(exampleIngredient);
  const [procedure, setProcedure] = useState(["eat shit", "die"]);
  const [tags, setTags] = useState(["mexican", "salty"]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          New Recipe
        </Typography>
      </Grid>
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 8 }} spacing={1} container>
        <TextField
          label="Recipe Name"
          fullWidth
          variant="filled"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />
        <TextField
          label="Servings"
          fullWidth
          variant="filled"
          slotProps={numericProps}
          value={servings}
          onChange={e => setServings(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Ingredients
        </Typography>
        <NewIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Procedure
        </Typography>
        <NewProcedure
          procedure={procedure}
          setProcedure={setProcedure}
        />
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Tags
        </Typography>
        <AddTags
          tags={tags}
          setTags={setTags}
        />
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Image
        </Typography>
        <Button variant="contained" color="primary" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Button variant="contained" color="success" fullWidth>
          Add Recipe
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewRecipe;
