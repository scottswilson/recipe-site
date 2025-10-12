import { useState } from "react";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
  const [tags, setTags] = useState(["sweet", "salty", "single pot", "excrement"]);

  return (
    <Grid container spacing={1} padding={0.5} backgroundColor="#CCC" height="100%" alignContent="flex-start">
      <Grid size={{ xs: 12 }} />
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 8 }}>
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Grid spacing={1} container>
            <TextField
              label="Recipe Name"
              fullWidth
              variant="outlined"
              value={recipeName}
              onChange={e => setRecipeName(e.target.value)}
            />
            <TextField
              label="Servings"
              fullWidth
              variant="outlined"
              slotProps={numericProps}
              value={servings}
              onChange={e => setServings(e.target.value)}
            />

          </Grid>
        </Paper>
      </Grid>
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 12 }} >
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Ingredients
          </Typography>
          <NewIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Procedure
          </Typography>
          <NewProcedure
            procedure={procedure}
            setProcedure={setProcedure}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Tags
          </Typography>
          <AddTags
            tags={tags}
            setTags={setTags}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Image
          </Typography>
          <Button variant="contained" color="primary" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <Paper backgroundColor="white" style={{ padding: "5px" }}>
          <Grid container spacing={1}>
            <Grid item size={6}>
              <Button variant="contained" color="success" fullWidth>
                Make Copy
              </Button>

            </Grid>
            <Grid item size={6}>

              <Button variant="contained" color="error" fullWidth>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }} />
    </Grid>
  );
}

export default NewRecipe;
