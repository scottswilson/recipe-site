import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getLoginInfo } from "./Util"

import {
  State,
  registerSchema,
} from "./Schema"

const RegisterPage = (props) => {

  const { ctx } = props;

  const [formValues, setFormValues] = useState({
    username: '',
    key: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    console.log(formValues.password.length < 6);
    if (!formValues.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formValues.key) {
      newErrors.key = 'Key is required';
    }

    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setBusy(true);

    let info = await getLoginInfo(formValues);
    info.key = formValues.key;

    console.log('Registering user:', info);

    const onSuccess = (error) => {
      ctx.state.set(State.LOGIN);
      setBusy(false);
    }

    const onFailed = (error) => {
      setBusy(false);
      if (error.response) {
        setErrors({
          ...errors,
          generic: error.response.data.error || "error",
        });
      } else {
        setErrors({
          ...errors,
          generic: 'Network error',
        });
      }
    }

    registerSchema(ctx, info, onSuccess, onFailed);
  };

  const goBack = () => {
    ctx.state.set(State.LOGIN);
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create an Account
        </Typography>
        {errors.generic && <Alert severity="error">{errors.generic}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formValues.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Special Key"
                name="key"
                type="key"
                value={formValues.key}
                onChange={handleChange}
                error={!!errors.key}
                helperText={errors.key}
              />
            </Grid>

            <Grid size={6}>
              <Button
                onClick={goBack}
                variant="outlined"
                fullWidth
                size="large"
              >
                Back
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={busy}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;