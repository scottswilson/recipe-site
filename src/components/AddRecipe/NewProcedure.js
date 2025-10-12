import { useState } from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { GoodButton, listSlotProps } from "../Styled"

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
            slotProps={listSlotProps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateStep(event.target.value);
            }}
          />
        </Grid>
        <Grid item size={{ xs: 2 }} sx={{
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

function getEmptyProcedure() {
  return "";
}

function NewProcedure(props) {

  const { procedure, setProcedure } = props;

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

      <Grid item size={{ xs: 12 }}>
        <Button
          onClick={newStep}
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

export default NewProcedure;
