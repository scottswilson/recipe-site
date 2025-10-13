

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

import { numericProps } from "../Common"
import { GoodButton } from "../Styled"
import {
  useThrottle,
  ingredientsSchema,
} from "../Schema"

import styled from "styled-components";

const CenteredTextField = styled(TextField)`
  border: 0px;
  margin: 5px;
  div {
    border: 0px;
    padding: 5px;
  }
  input {
    text-align: center;
    border: 0px;
    padding:0px;
    margin: 0px;
    height: 26px;
  }
  fieldset {
    // border: 0px;
  }
`;

function AmountPopover(props) {

  const { ctx, id, ingredients, set, index } = props;

  const wholeThrottle = useThrottle(ingredientsSchema, 500);
  const numThrottle = useThrottle(ingredientsSchema, 500);
  const demThrottle = useThrottle(ingredientsSchema, 500);

  const incWhole = () => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.whole++;
    set(newIngreds);
    ingredientsSchema(ctx, id, newIngreds);
  };

  const decWhole = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.whole > 0) {
      newIngreds[index].amount.whole--;
      set(newIngreds);
      ingredientsSchema(ctx, id, newIngreds);
    }
  };

  const setWhole = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.whole = text.replaceAll(/[^0-9]/g, "");
    set(newIngreds);
    wholeThrottle(ctx, id, newIngreds);
  };

  const incNumerator = () => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.num++;
    set(newIngreds);
    ingredientsSchema(ctx, id, newIngreds);
  };

  const decNumerator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.num > 0) {
      newIngreds[index].amount.num--;
      set(newIngreds);
      ingredientsSchema(ctx, id, newIngreds);
    }
  };

  const setNum = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.num = text.replaceAll(/[^0-9]/g, "");
    set(newIngreds);
    numThrottle(ctx, id, newIngreds);
  };

  const incDenominator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.dem < 16) {
      newIngreds[index].amount.dem++;
      set(newIngreds);
      ingredientsSchema(ctx, id, newIngreds);
    }
  };

  const decDenominator = () => {
    let newIngreds = ingredients.slice();
    if (newIngreds[index].amount.dem > 1) {
      newIngreds[index].amount.dem--;
      set(newIngreds);
      ingredientsSchema(ctx, id, newIngreds);
    }
  };

  const setDem = (text) => {
    let newIngreds = ingredients.slice();
    newIngreds[index].amount.dem = text.replaceAll(/[^0-9]/g, "");
    set(newIngreds);
    demThrottle(ctx, id, newIngreds);
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
      <GoodButton
        variant="outlined"
        onClick={handleClick}
        sx={{ height: '100%', padding: "5px" }}
        color="primary"
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
      </GoodButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Grid container style={{ width: "300px" }} spacing={1} padding={1}>
          <Grid size={{ xs: 4 }} container direction="column" sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Grid container direction="column">
              <Button
                onClick={incWhole}
                variant="outlined"
              >
                <KeyboardArrowUpIcon />
              </Button>
              <CenteredTextField
                value={ingredient.amount.whole}
                onChange={(e) => setWhole(e.target.value)}
                slotProps={numericProps}
              />
              <Button
                onClick={decWhole}
                variant="outlined"
              >
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid size={{ xs: 3 }} container direction="column" sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Button
              onClick={decNumerator}
              variant="outlined"
            >
              <KeyboardArrowLeftIcon />
            </Button>
            <Button
              onClick={decDenominator}
              variant="outlined"

            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Grid>
          <Grid size={{ xs: 2 }} container direction="column" sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <CenteredTextField
              value={ingredient.amount.num}
              onChange={(e) => setNum(e.target.value)}
              slotProps={numericProps}
            />
            <CenteredTextField
              value={ingredient.amount.dem}
              onChange={(e) => setDem(e.target.value)}
              slotProps={numericProps}
            />
          </Grid>
          <Grid size={{ xs: 3 }} container direction="column" sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Button
              onClick={incNumerator}
              variant="outlined"
            >
              <KeyboardArrowRightIcon />
            </Button>
            <Button
              onClick={incDenominator}
              variant="outlined"
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

export default AmountPopover;
