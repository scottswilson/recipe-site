import { useState } from "react";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function ProcedureRow(props) {
  const { procedure, set, index } = props;

  const [deletePrimed, setDeletePrimed] = useState(false);

  const updateStep = (text) => {
    let newProcedure = procedure.slice();
    newProcedure[index] = text;
    set(newProcedure);
  };

  const primeDelete = () => {
    setDeletePrimed(true);
  };

  const unprimeDelete = () => {
    setDeletePrimed(false);
  };

  const onDelete = () => {
    let newProcedure = procedure.slice();
    newProcedure.splice(index, 1)
    set(newProcedure);
    unprimeDelete();
  };


  return (
    <Grid item>
      <Grid container>
        <Grid item size={{ xs: 11 }}>
          <TextField
            label={"Step " + index}
            fullWidth
            multiline
            variant="filled"
            value={procedure[index]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateStep(event.target.value);
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

function getEmptyProcedure() {
  return "";
}

function NewProcedure(props) {

  const {procedure, setProcedure} = props;

  const newStep = () => {
    let newProcedure = procedure.concat([getEmptyProcedure()]);
    setProcedure(newProcedure);
  }

  return (
    <Grid container>

      <Grid item size={{ xs: 12 }}>
        {procedure.map((_, i) => {
          return (
            <ProcedureRow
              procedure={procedure}
              index={i}
              set={setProcedure}
            />
          );
        })}
      </Grid>

      <Grid item size={{ xs: 10 }}>
      </Grid>

      <Grid item size={{ xs: 1 }}>
        <IconButton
          onClick={newStep}
          fullWidth
          variant="filled"
        >
          <AddIcon/>
        </IconButton>
      </Grid>

    </Grid>
  );
}

export default NewProcedure;
