import { useState } from "react";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


function NewProcedure(props) {

  const { tags, setTags } = props;
  const [text, setText] = useState("");

  const newTag = (tag) => {
    let newTags = tags.concat([tag]);
    setTags(newTags);
  }

  const onTagChange = (newText) => {
    const delimiters = [
      " ", "\n", ","
    ]

    delimiters.forEach(delim => {
      const split = newText.split(delim);
      if (split.length > 1) {
        newTag(split[0]);
        newText = ""
      }
    })

    setText(newText.replaceAll(/[^0-9a-zA-Z]/g, ""));
  };

  const deleteTag = (i) => {
    let newTags = tags.slice();
    newTags.splice(i, 1)
    setTags(newTags);
  };

  return (
    <Grid container>

      <Grid item size={{ xs: 12 }} sx={{
        justifyContent: "center",
        alignItems: "center",
      }} container>
        {tags.map((tag, i) => {
          return (
            <Chip
              label={tag}
              onClick={() => { deleteTag(i) }}
              variant="contained"
              color="primary"
            />
          );
        })}
      </Grid>

      <Grid item size={{ xs: 2 }} />

      <Grid item size={{ xs: 8 }}>
        <TextField
          label="New Tag"
          value={text}
          onChange={(e) => onTagChange(e.target.value)}
          variant="filled"
          multiline
          fullWidth
        />
      </Grid>

      <Grid item size={{ xs: 2 }} />

    </Grid>
  );
}

export default NewProcedure;
