import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import {
  loginSchema,
  dashboardSchema,
} from "./Schema"

const LoginPage = (props) => {
  const { ctx } = props;

  const [formData, setFormData] = useState({ user: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardSchema(ctx);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let info = {
      user: formData.user,
      pass: "",
    }

    const saltedPass = info.user + "<>" + +formData.password;

    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(saltedPass);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    info.pass = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');


    console.log(info);

    const onSuccess = (error) => {
      dashboardSchema(ctx);
    }

    const onFailed = (error) => {
      setError(`Error: ${error}`);
    }

    loginSchema(ctx, info, onSuccess, onFailed);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {ctx.loggedIn.value ? (
          <Alert severity="success">Logged in successfully!</Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="User"
              name="user"
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
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;