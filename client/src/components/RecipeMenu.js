import { React, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  State,
  newRecipeSchema,
  logoutSchema,
} from "./Schema"

export default function RecipeMenu(props) {
  const { ctx, enableEdit, enableNew } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onAdd = () => {

    const cbSuccess = () => {
      ctx.state.set(State.EDIT);
    };

    const cbFinally = () => {
    };

    newRecipeSchema(ctx, cbFinally, cbSuccess);
  };

  const onEdit = () => {
    ctx.state.set(State.EDIT);
    handleClose();
  }

  const onLogout = () => {
    logoutSchema(ctx);
    handleClose();
  }

  return (
    <div
      style={{ height: "100%", width: "100%" }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ height: "100%" }}
        fullWidth
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {enableNew ? (
          <MenuItem
            onClick={onAdd}
          >
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText>New</ListItemText>
          </MenuItem>
        ) : (<></>)}
        {enableEdit ? (
          <MenuItem onClick={onEdit}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        ) : (<></>)}
        <MenuItem onClick={onLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>

      </Menu>
    </div>
  );
}