import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Grid,
  TextField,
  Alert,
} from '@mui/material';

import {
  copyRecipeSchema,
} from "../Schema"

const CopyRecipe = (props) => {
  const { ctx, id, currentName, onCopy } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyName, setCopyName] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if (!loading) {
      setModalOpen(false);
      setError('');
    }
  };

  const handleCopy = () => {
    setLoading(true);
    setError('');

    const cbSuccess= () => {
      ctx.selectedId.set("");
      handleClose();
      onCopy();
    }

    const cbFinally = () => {
      setLoading(false);
    }

    copyRecipeSchema(ctx, id, copyName, cbFinally, cbSuccess);
  };

  useEffect(() => {
    setCopyName(currentName + " Copy");
  }, [ctx.selectedId.value]);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        fullWidth
      >
        Make a Copy
      </Button>

      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Copy Recipe</DialogTitle>
        <DialogContent>
          <Grid container padding={2}>
            <TextField
              label="New Recipe Name"
              value={copyName}
              onChange={(e) => setCopyName(e.target.value)}
            />
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container style={{ minWidth: "300px", width: "100%" }} spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Button variant="outlined" onClick={handleClose} disabled={loading} fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                onClick={handleCopy}
                color="success"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Create"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CopyRecipe;