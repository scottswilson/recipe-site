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
        <Grid item size={{ xs: 10 }}>
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
        <Grid item size={{ xs: 2 }} sx={{
            justifyContent: "center",
            alignItems: "center",
          }} container >
          <Button
            onClick={deletePrimed ? onDelete : primeDelete}
            color={deletePrimed ? "error" : "primary"}
            variant={deletePrimed ? "contained" : "outlined"}
            onBlur={unprimeDelete}
            sx={{ height: "100%" }}
            fullWidth
          >
            <DeleteIcon />
          </Button>
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

      <Grid item size={{ xs: 1 }}/>

      <Grid item size={{ xs: 10 }}>
        <Button
          onClick={newStep}
          fullWidth
          variant="outlined"
          color="secondary"
        >
          <AddIcon/>
        </Button>
      </Grid>

      <Grid item size={{ xs: 1 }}/>
    </Grid>
  );
}

export default NewProcedure;
