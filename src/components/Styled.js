import ListItem from '@mui/material/ListItem';
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
