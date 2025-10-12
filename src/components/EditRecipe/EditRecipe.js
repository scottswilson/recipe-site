import { useState } from "react";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TextField, Button } from "@mui/material";

import EditIngredients from "./EditIngredients";
import EditProcedure from "./EditProcedure";
import ImageCropUpload from "./ImageCropUpload";
import AddTags from "./AddTags";
import DeleteRecipe from "./DeleteRecipe";

import { numericProps } from "../Common"
import styled from "styled-components";
import CopyRecipe from "./CopyRecipe";


export const RecipePaper = styled(Paper)`
  background: white;
  padding: 5px;
`;

function EditRecipe(props) {

  const { setTab } = props;
  const currentRecipe = {
    "id": "283e161c-6268-430d-8e22-8d611327dad7",
    "name": "Shit Sandwich",
    "servings": 10,
    "ingredients": [
      {
        "label": "meat, ground",
        "amount": { "whole": 2, "num": 0, "dem": 1 },
        "units": "lbs.",
      }, {
        "label": "large onion, chopped",
        "amount": { "whole": 0, "num": 1, "dem": 2 },
        "units": "",
      },
    ],
    "procedure": ["eat shit", "die"],
    'tags': ["sweet", "salty", "single pot", "excrement"],
    'image': 'test.webp'
  };

  const [recipeName, setRecipeName] = useState(currentRecipe.name);
  const [servings, setServings] = useState(currentRecipe.servings);
  const [ingredients, setIngredients] = useState(currentRecipe.ingredients);
  const [procedure, setProcedure] = useState(currentRecipe.procedure);
  const [tags, setTags] = useState(currentRecipe.tags);

  const goToRecipeList = () => {
    setTab(0);
  }

  return (
    <Grid container spacing={1} padding={0.5} backgroundColor="#CCC" height="100%" alignContent="flex-start">
      <Grid size={{ xs: 12 }} />
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 8 }}>
        <Paper backgroundColor="white" style={{ padding: "15px" }}>
          <Grid spacing={2} container>
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
        <RecipePaper style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Ingredients
          </Typography>
          <EditIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <RecipePaper>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Procedure
          </Typography>
          <EditProcedure
            procedure={procedure}
            setProcedure={setProcedure}
          />
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <RecipePaper>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Tags
          </Typography>
          <AddTags
            tags={tags}
            setTags={setTags}
          />
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <RecipePaper>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Image
          </Typography>
          <ImageCropUpload />
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 12 }} >
        <RecipePaper>
          <Grid container spacing={1}>
            <Grid item size={6}>
              <CopyRecipe
                id={currentRecipe.id}
                currentName={currentRecipe.name}
                onCopy={goToRecipeList}
              />
            </Grid>
            <Grid item size={6}>
              <DeleteRecipe
                id={currentRecipe.id}
                onDelete={goToRecipeList}
              />
            </Grid>
          </Grid>
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 12 }} />
    </Grid>
  );
}

export default EditRecipe;
