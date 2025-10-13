import { useState, useEffect } from "react";

import {
  TextField,
  Typography,
  Paper,
  Grid
} from "@mui/material";

import EditIngredients from "./EditIngredients";
import EditProcedure from "./EditProcedure";
import ImageCropUpload from "./ImageCropUpload";
import AddTags from "./AddTags";
import DeleteRecipe from "./DeleteRecipe";
import CopyRecipe from "./CopyRecipe";

import { numericProps } from "../Common"
import {
  useThrottle,
  recipeNameSchema,
  servingsSchema,
} from "../Schema"

import styled from "styled-components";


export const RecipePaper = styled(Paper)`
  background: white;
  padding: 5px;
`;

function EditRecipe(props) {

  const { setTab, recipe, ctx } = props;

  const [recipeName, setRecipeName] = useState(recipe.name);
  const [servings, setServings] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [procedure, setProcedure] = useState(recipe.procedure);
  const [tags, setTags] = useState(recipe.tags);

  const recipeNameSchemaThrottle = useThrottle(recipeNameSchema, 500);
  const servingsSchemaThrottle = useThrottle(servingsSchema, 500);

  const onRecipeName = (name) => {
    setRecipeName(name);
    recipeNameSchemaThrottle(ctx, recipe.id, name);
  };

  const onServings = (x) => {
    setServings(x);
    servingsSchemaThrottle(ctx, recipe.id, x);
  };

  const goToRecipeList = () => {
    setTab(0);
  };

  useEffect(() => {
    setRecipeName(recipe.name);
    setServings(recipe.servings);
    setIngredients(recipe.ingredients);
    setProcedure(recipe.procedure);
    setTags(recipe.tags);
  }, [ctx.selectedId.value]);

  return (
    <Grid container spacing={1} padding={0.5} backgroundColor="#CCC" height="100%" alignContent="flex-start">
      <Grid size={{ xs: 12 }} />
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 8 }}>
        <RecipePaper style={{ padding: "15px" }}>
          <Grid spacing={2} container>
            <TextField
              label="Recipe Name"
              fullWidth
              variant="outlined"
              value={ctx.key.value}
              onChange={e => ctx.key.set(e.target.value)}
            />
            <TextField
              label="Recipe Name"
              fullWidth
              variant="outlined"
              value={recipeName}
              onChange={e => onRecipeName(e.target.value)}
            />
            <TextField
              label="Servings"
              fullWidth
              variant="outlined"
              slotProps={numericProps}
              value={servings}
              onChange={e => onServings(e.target.value)}
            />

          </Grid>
        </RecipePaper>
      </Grid>
      <Grid size={{ xs: 2 }} />
      <Grid size={{ xs: 12 }} >
        <RecipePaper style={{ padding: "5px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Ingredients
          </Typography>
          <EditIngredients
            ctx={ctx}
            id={recipe.id}
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
            ctx={ctx}
            id={recipe.id}
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
            ctx={ctx}
            id={recipe.id}
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
                ctx={ctx}
                id={recipe.id}
                currentName={recipe.name}
                onCopy={goToRecipeList}
              />
            </Grid>
            <Grid item size={6}>
              <DeleteRecipe
                ctx={ctx}
                id={recipe.id}
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
