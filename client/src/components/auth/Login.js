import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

// The Login component as a functional component
function Login({ login, isAuthenticated }) {
  // login is referencinig the action creator
  // isAuthenticated prop is an alias for the global auth state in the Redux store

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

  // According to the global auth state, if the user isAuthenticated
  if (isAuthenticated) {
    // Redirect them to their dashboard instead
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid textAlign="center" style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={(e) => onSubmit(e)}>
          <Segment stacked>
            {/* Email input */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="email"
              placeholder="E-mail address"
              onChange={(e) => onChange(e)}
            />
            {/* Password input */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => onChange(e)}
            />
            {/* Submit button */}
            <Button type="submit" color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        {/* Redirect to the register component */}
        <Message>
          New to us? <a href="/register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     {/* Avatar Icon */}
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     {/* Sign In Header */}
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
    //       {/* Email Address */}
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //         onChange={(e) => onChange(e)}
    //       />
    //       {/* Password */}
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         onChange={(e) => onChange(e)}
    //       />
    //       {/* Submit button */}
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //       >
    //         Sign In
    //       </Button>

    //       <Grid container>
    //         {/* Redirect to Register component */}
    //         <Grid item>
    //           <Link href="/register" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </div>
    // </Container>
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
