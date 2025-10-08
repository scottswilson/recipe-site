

import { React, useState } from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styled from "styled-components";

const CenteredTextField = styled(TextField)`
  input {
    text-align: center;
  }
`;

function AmountPopover(props) {

  const { ingredients, set, index } = props;

  const incWhole = () => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.whole++;
    set(newIngreds);
  };

  const decWhole = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.whole > 0) {
      newIngreds[index].amount.whole--;
      set(newIngreds);
    }
  };

  const incNumerator = () => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.num++;
    set(newIngreds);
  };

  const decNumerator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.num > 0) {
      newIngreds[index].amount.num--;
      set(newIngreds);
    }
  };

  const incDenominator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.dem < 16) {
      newIngreds[index].amount.dem++;
      set(newIngreds);
    }
  };

  const decDenominator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.dem > 1) {
      newIngreds[index].amount.dem--;
      set(newIngreds);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const ingredient = ingredients[index];

  return (
    <>
      <Button
        variant=""
        onClick={handleClick}
        fullWidth
      >
        <Typography sx={{ fontWeight: "bold" }}>
          {
            ingredient.amount.whole > 0 ? (
              String(ingredient.amount.whole) + " "
            ) : (
              ""
            )
          }{
            ingredient.amount.num > 0 ? (
              ingredient.amount.num + "/" + ingredient.amount.dem
            ) : (
              ""
            )
          }
        </Typography>
      </Button>
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Grid container>
          <Grid item size={{ xs: 4 }} sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <Grid container direction="column" sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
              <Button
                variant=""
                onClick={incWhole}
              >
                <KeyboardArrowUpIcon />
              </Button>
              <CenteredTextField
                value={ingredient.amount.whole}
                style={{ width: "100px" }}
                textAlign={'center'}
              />
              <Button
                variant=""
                onClick={decWhole}
              >
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid item size={{ xs: 8 }}>
            <Grid container direction="column">
              <Grid item size={{ xs: 12 }}>

                <Grid container direction="row">
                  <Grid item size={{ xs: 4 }}>
                    <Button
                      variant=""
                      onClick={decNumerator}
                    >
                      <KeyboardArrowLeftIcon />
                    </Button>
                  </Grid>
                  <Grid item size={{ xs: 4 }}>
                    <CenteredTextField
                      size="small"
                      value={ingredient.amount.num}
                      style={{ width: "100px" }}
                      textAlign={'center'}
                    />
                  </Grid>

                  <Grid item size={{ xs: 4 }}>
                    <Button
                      variant=""
                      onClick={incNumerator}
                    >
                      <KeyboardArrowRightIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <Grid container direction="row">
                  <Grid item size={{ xs: 4 }}>
                    <Button
                      variant=""
                      onClick={decDenominator}
                    >
                      <KeyboardArrowLeftIcon />
                    </Button>
                  </Grid>
                  <Grid item size={{ xs: 4 }}>
                    <CenteredTextField
                      size="small"
                      value={ingredient.amount.dem}
                      style={{ width: "100px" }}
                    />
                  </Grid>

                  <Grid item size={{ xs: 4 }}>
                    <Button
                      variant=""
                      onClick={incDenominator}
                    >
                      <KeyboardArrowRightIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popover >
    </>
  );
}

export default AmountPopover;
