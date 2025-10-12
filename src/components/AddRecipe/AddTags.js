import { useState } from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';


function NewProcedure(props) {

  const { tags, setTags } = props;
  const [text, setText] = useState("");

  const newTag = (tag) => {
    let newTags = tags.concat([tag]);
    setTags(newTags);
  }

  const onTagChange = (newText) => {
    const delimiters = [
      "\n", ","
    ]

    delimiters.forEach(delim => {
      const split = newText.split(delim);
      if (split.length > 1) {
        newTag(split[0]);
        newText = ""
      }
    })

    setText(newText.replaceAll(/[^0-9a-zA-Z ]/g, ""));
  };

  const deleteTag = (i) => {
    let newTags = tags.slice();
    newTags.splice(i, 1)
    setTags(newTags);
  };

  return (
    <Grid container spacing={1}>

      <Grid item size={{ xs: 12 }} sx={{
        justifyContent: "center",
        alignItems: "center",
      }} container spacing={1}>
        {tags.map((tag, i) => {
          return (
            <Chip
              label={tag}
              onClick={() => { deleteTag(i) }}
              variant="contained"
              color="primary"
              icon={<ClearIcon fontSize="small" />}
            >
            </Chip>
          );
        })}
      </Grid>

      <Grid item size={{ xs: 1 }} />

      <Grid item size={{ xs: 8 }}>
        <TextField
          label="New Tag"
          value={text}
          onChange={(e) => onTagChange(e.target.value)}
          variant="outlined"
          multiline
          fullWidth
        />
      </Grid>

      <Grid item size={{ xs: 2 }}>
        <Button
          onChange={(e) => onTagChange(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ height: "100%" }}
        >
          <AddIcon/>
        </Button>
      </Grid>
      
      <Grid item size={{ xs: 1 }} />

    </Grid>
  );
}

export default NewProcedure;
