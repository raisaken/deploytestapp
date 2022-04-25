import React, { useEffect, useState } from "react";
// import BaseApi from "../config/Api";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
//MaterialUI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@mui/material";
// import { useAuth } from "../config/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/users/UserSlice";
import { useNavigate } from "react-router-dom";
// import { login } from "../features/users/UserSlice";

export const Login = () => {
  //   const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(), //removes space from both sides of a string
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const success = useSelector((state) => state.user.isSuccess);
  console.log(success);

  useEffect(() => {

    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <Container component="main" maxWidth="xs" sx={{ my: 10 }}>
      <CssBaseline />
      <div>
        <Avatar></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" to="/">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
