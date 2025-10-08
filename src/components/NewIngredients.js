import { useState } from "react";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AmountPopover from "./AmountPopover";

import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';


function IngredientRow(props) {
  const { ingredients, set, index } = props;

  const [deletePrimed, setDeletePrimed] = useState(false);

  const updateLabel = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].label = text;
    set(newIngreds);
  };
  const updateUnits = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].units = text;
    set(newIngreds);
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
    unprimeDelete();
  };

  const ingredient = ingredients[index];

  return (
    <Grid item>
      <Grid container>

        <Grid item size={{ xs: 4, sm: 3, md: 2 }}>
          <AmountPopover
            ingredients={ingredients}
            set={set}
            index={index}
          />
        </Grid>

        <Grid item size={{ xs: 2 }}>
          <TextField
            label="Units"
            fullWidth
            variant="filled"
            value={ingredient.units}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateUnits(event.target.value);
            }}
          />
        </Grid>

        <Grid item size={{ xs: 5, sm: 6, md: 7 }}>
          <TextField
            label="Name"
            fullWidth
            variant="filled"
            value={ingredient.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateLabel(event.target.value);
            }}
          />
        </Grid>

        <Grid item size={{ xs: 1 }}>
          {deletePrimed ? (
            <Button
              onClick={onDelete}
              color="error"
              variant="contained"
              onBlur={unprimeDelete}
            >
              <DeleteIcon />
            </Button>
          ) : (
            <Button onClick={primeDelete}>
              <RemoveCircleIcon />
            </Button>
          )}
        </Grid>

      </Grid>
    </Grid>
  );
}

function getEmptyIngredient() {
  return {
    "label": "",
    "amount": {"whole": 1, "num": 0, "dem": 1 },
    "units": "",
  }
}

function NewIngredients(props) {

  const { ingredients, setIngredients } = props;

  const newIngredient = () => {
    let newIngredients = ingredients.concat([getEmptyIngredient()]);
    setIngredients(newIngredients);
  }

  return (
    <Grid container>

      <Grid item size={{ xs: 12 }}>
        {ingredients.map((_, i) => {
          return (
            <IngredientRow
              ingredients={ingredients}
              index={i}
              set={setIngredients}
            />
          );
        })}
      </Grid>

      <Grid item size={{ xs: 10 }}>
      </Grid>

      <Grid item size={{ xs: 1 }}>
        <IconButton
          onClick={newIngredient}
          fullWidth
          variant="filled"
        >
          <AddIcon />
        </IconButton>
      </Grid>

    </Grid>
  );
}

export default NewIngredients;
