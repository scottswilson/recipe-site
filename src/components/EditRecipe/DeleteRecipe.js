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
  Alert,
} from '@mui/material';

const deleteUrl = "https://www.example.com/api/delete"

const DeleteRecipe = (props) => {
  const { itemId, onDelete } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if (!loading) {
      setModalOpen(false);
      setError('');
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(deleteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      handleClose();
      onDelete();
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
        color="error"
        onClick={handleOpen}
        fullWidth
      >
        Delete
      </Button>

      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Permanently delete recipe.
          </DialogContentText>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container style={{ minWidth: "300px", width: "100%" }} spacing={1}>
            <Grid item size={{xs: 6}}>
              <Button variant="outlined" onClick={handleClose} disabled={loading} fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item size={{xs: 6}}>
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteRecipe;