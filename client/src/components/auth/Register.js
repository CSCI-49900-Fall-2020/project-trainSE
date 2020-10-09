import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// The Register component as a functional component
function Register({ setAlert, register, isAuthenticated }) {
  // setAlert is referencinig the action creator
  // register is referencing the action creator
  // isAuthenticated prop is an alias for the global auth state in the Redux store

  const classes = useStyles();

  // Maintain local state for user inputted register data
  // formData state is an object
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  // Destructure the formData state
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    passwordCheck,
  } = formData;

  // Everytime a change is detected with user input
  const onChange = (e) =>
    // Take the event that triggered the change
    // ...formData is the rest of the formData object
    // [e.target.name] resolves to a property for the object
    // e.target.value resolves to a value for a property
    // The entirety resolves to a final object that is set as the new formData state
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // When a user submits their form data
  const onSubmit = async (e) => {
    e.preventDefault(); // This prevents the default behavior of a page re-load

    if (password !== passwordCheck) {
      setAlert("Passwords do not match", "error");
    } else {
      register({
        firstName,
        lastName,
        username,
        email,
        password,
        passwordCheck,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // The actual HTML/JSX to return after a component is mounted
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          {/* First name */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => onChange(e)}
              />
            </Grid>
            {/* Last name */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            {/* Username */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            {/* Email address */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            {/* Confirm password */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="Confirm Password"
                type="password"
                id="passwordCheck"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

// Prop validation for the Register component
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called isAuthenticated
  // Now, we can use isAuthenticated in this component
  isAuthenticated: state.auth.isAuthenticated,
});

// This Register component is connected to the Redux store through connect
// mapStateToProps and register action creator are tied to Redux, so connect() further ties this functionalty to the Register component
export default connect(mapStateToProps, { setAlert, register })(Register);
