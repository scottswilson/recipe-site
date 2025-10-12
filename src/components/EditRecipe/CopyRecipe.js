import { useState } from 'react';
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

const url = "https://www.example.com/api/copy"

const CopyRecipe = (props) => {
  const { itemId, currentName, onCopy } = props;

  const suggestedName = currentName + " Copy";

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyName, setCopyName] = useState(suggestedName);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if (!loading) {
      setModalOpen(false);
      setError('');
    }
  };

  const handleCopy = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to copy item');
      }

      handleClose();
      onCopy();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

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
            <Grid item size={{ xs: 6 }}>
              <Button variant="outlined" onClick={handleClose} disabled={loading} fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item size={{ xs: 6 }}>
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