import { useState } from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import AmountPopover from "./AmountPopover";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


import { GoodButton, listSlotProps } from "../Styled"
import { getEmptyIngredient } from "../Common"
import {
  useThrottle,
  ingredientsSchema,
} from "../Schema"

function IngredientRow(props) {
  const { ctx, id, ingredients, set, index } = props;

  const [deletePrimed, setDeletePrimed] = useState(false);

  const ingredientsLabelThrottle = useThrottle(ingredientsSchema, 500);
  const ingredientsUnitsThrottle = useThrottle(ingredientsSchema, 500);

  const updateLabel = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].label = text;
    set(newIngreds);
    ingredientsLabelThrottle(ctx, id, newIngreds);
  };

  const updateUnits = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].units = text;
    set(newIngreds);
    ingredientsUnitsThrottle(ctx, id, newIngreds);
  };


  const primeDelete = () => {
    setDeletePrimed(true);
  };

  const unprimeDelete = () => {
    setDeletePrimed(false);
  };

  const onDelete = () => {
    let newIngreds = ingredients.slice();
    newIngreds.splice(index, 1)
    set(newIngreds);
    ingredientsSchema(ctx, id, newIngreds);
    unprimeDelete();
  };

  const ingredient = ingredients[index];

  return (
    <Grid>
      <Grid container>

        <Grid size={{ xs: 2, md: 1 }}>
          <AmountPopover
            ctx={ctx}
            id={id}
            ingredients={ingredients}
            set={set}
            index={index}
          />
        </Grid>

        <Grid size={{ xs: 2 }}>
          <TextField
            label="Units"
            fullWidth
            variant="filled"
            value={ingredient.units}
            slotProps={listSlotProps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateUnits(event.target.value);
            }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 7 }}>
          <TextField
            label="Name"
            fullWidth
            variant="filled"
            slotProps={listSlotProps}
            value={ingredient.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateLabel(event.target.value);
            }}
          />
        </Grid>

        <Grid size={{ xs: 2 }} sx={{
          justifyContent: "center",
          alignItems: "center",
        }} container >
          <GoodButton
            onClick={deletePrimed ? onDelete : primeDelete}
            color={deletePrimed ? "error" : "primary"}
            variant={deletePrimed ? "contained" : "outlined"}
            onBlur={unprimeDelete}
            sx={{ height: "100%" }}
          >
            <DeleteIcon />
          </GoodButton>
        </Grid>

      </Grid>
    </Grid>
  );
}

function EditIngredients(props) {

  const { ctx, id, ingredients, setIngredients } = props;

  const newIngredient = () => {
    let newIngredients = ingredients.concat([getEmptyIngredient()]);
    setIngredients(newIngredients);
    ingredientsSchema(ctx, id, newIngredients);
  }

  return (
    <Grid container spacing={0.7}>

      <Grid size={{ xs: 12 }}>
        {ingredients.map((_, i) => {
          return (
            <IngredientRow
              ctx={ctx}
              id={id}
              ingredients={ingredients}
              index={i}
              set={setIngredients}
            />
          );
        })}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Button
          onClick={newIngredient}
          fullWidth
          variant="outlined"
          color="primary"
        >
          <AddIcon />
        </Button>
      </Grid>

    </Grid>
  );
}

export default EditIngredients;
