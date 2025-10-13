import { useState } from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import {
  tagsSchema,
} from "../Schema"

function NewProcedure(props) {

  const { ctx, id, tags, setTags } = props;
  const [text, setText] = useState("");

  const newTag = (tag) => {
    if (tag.length > 0) {
      let newTags = tags.concat([tag]);
      setTags(newTags);
      tagsSchema(ctx, id, newTags);
    }
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

  const onAccept = () => {
    newTag(text);
    setText("");
  };

  const deleteTag = (i) => {
    let newTags = tags.slice();
    newTags.splice(i, 1)
    setTags(newTags);
    tagsSchema(ctx, id, newTags);
  };

  return (
    <Grid container spacing={1}>

      <Grid size={{ xs: 12 }} sx={{
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

      <Grid size={{ xs: 1 }} />

      <Grid size={{ xs: 8 }}>
        <TextField
          label="New Tag"
          value={text}
          onChange={(e) => onTagChange(e.target.value)}
          variant="outlined"
          multiline
          fullWidth
        />
      </Grid>

      <Grid size={{ xs: 2 }}>
        <Button
          onClick={onAccept}
          variant="outlined"
          fullWidth
          sx={{ height: "100%" }}
        >
          <CheckIcon/>
        </Button>
      </Grid>
      
      <Grid size={{ xs: 1 }} />

    </Grid>
  );
}

export default NewProcedure;
