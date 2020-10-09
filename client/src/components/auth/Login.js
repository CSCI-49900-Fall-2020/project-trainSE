import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Material UI styling
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// The Login component as a functional component
function Login({ login, isAuthenticated }) {
  // login is referencinig the action creator
  // isAuthenticated prop is an alias for the global auth state in the Redux store
  const classes = useStyles();

  // Maintain local state for user inputted register data
  // formData state is an object of email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure the email and password out of formData
  const { email, password } = formData;

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
    // Call login action creator to authenticate user
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* Avatar Icon */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* Sign In Header */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          {/* Email Address */}
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
            onChange={(e) => onChange(e)}
          />
          {/* Password */}
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
            onChange={(e) => onChange(e)}
          />
          {/* Submit button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            {/* Redirect to Register component */}
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

// Prop validation for the Login component
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called isAuthenticated
  // Now, we can use isAuthenticated as a prop in this component
  isAuthenticated: state.auth.isAuthenticated,
});

// This Login component is connected to the Redux store through connect
// mapStateToProps and login action creator are tied to Redux, so connect() further ties this functionalty to the Login component
export default connect(mapStateToProps, { login })(Login);
