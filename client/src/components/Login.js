import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { getLoginInfo } from "./Util"
import {
  State,
  loginSchema,
  getRecipesSchema,
} from "./Schema"


const LoginPage = (props) => {
  const { ctx } = props;

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const info = await getLoginInfo(formData);
    console.log(info);

    const onSuccess = (error) => {
      const onRecipes = () => {
        ctx.tab.set(0);
        ctx.state.set(State.VIEW);
      };
      getRecipesSchema(ctx, onRecipes);
    }

    const onFailed = (error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.error}`);
      } else {
        setError(`Network error`);
      }
    }

    loginSchema(ctx, info, onSuccess, onFailed);
  };

  const goToRegisterPage = () => {
    ctx.state.set(State.REGISTER);
  }

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.user}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Button
          onClick={goToRegisterPage}
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
        >
          New Account
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;