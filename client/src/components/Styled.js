import { ListItem, Button } from '@mui/material';
import styled from "styled-components";


export const viewStyle = {
  height: 'calc(100vh - 48px)',
  overflow: "auto"
};

export const EvenListItem = styled(ListItem)`
  background: #eeeeeeff;
  width: 100%;
  &:hover {
    background: #bcc2e2ff;
  }
`;

export const OddListItem = styled(EvenListItem)`
  background: #ffffffff;
  &:hover {
    background: #d2d9ffff;
  }
`;

export const GoodButton = styled(Button)`
  min-width: 0px !important;
  padding: 0px !important;
  width: 100%;
`;

export const listSlotProps = {
  input: {
    style: { fontSize: 15 }
  },
  inputLabel: {
    style: { fontSize: 15 }
  }
};