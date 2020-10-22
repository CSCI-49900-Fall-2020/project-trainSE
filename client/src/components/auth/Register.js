import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
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

// The Register component as a functional component
function Register({ setAlert, register, isAuthenticated }) {
  // setAlert is referencinig the action creator
  // register is referencing the action creator
  // isAuthenticated prop is an alias for the global auth state in the Redux store

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

  // When a user submits their form data, this function runs
  const onSubmit = async (e) => {
    e.preventDefault(); // This prevents the default behavior of a page re-load

    // Do some prelimnary check if the passwords do not match
    if (password !== passwordCheck) {
      // Call the setAlert action creator
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

  // According to the global auth state, if the user isAuthenticated
  if (isAuthenticated) {
    // Redirect them to their dashboard instead
    return <Redirect to="/dashboard" />;
  }

  // The actual HTML/JSX to return after a component is mounted
  return (
    <>
      {/* Grid houses the entirety of the JSX */}
      <Grid
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Register
          </Header>
          <Form size="large" onSubmit={(e) => onSubmit(e)}>
            <Segment>
              {/* First and Last Name Inputs */}
              <Form.Group unstackable widths={2}>
                {/* First name input */}
                <Form.Input
                  fluid
                  textAlign="left"
                  name="firstName"
                  label="First Name"
                  placeholder="First name"
                  onChange={(e) => onChange(e)}
                />
                {/* Last name input */}
                <Form.Input
                  fluid
                  name="lastName"
                  label="Last Name"
                  placeholder="Last name"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              {/* Username input */}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                label="Username"
                placeholder="Username"
                textAlign="none"
                onChange={(e) => onChange(e)}
              />
              {/* Email address input */}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                label="E-mail Address"
                placeholder="E-mail Address"
                onChange={(e) => onChange(e)}
              />
              {/* Password input */}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={(e) => onChange(e)}
              />
              {/* Confirm Password input */}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="passwordCheck"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => onChange(e)}
              />

              <Button type="sumbit" color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
          </Form>

          <Message>
            Already have an account? <a href="/login">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
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
// mapStateToProps, setAlert, and register action creator are tied to Redux, so connect() further ties this functionalty to the Register component
export default connect(mapStateToProps, { setAlert, register })(Register);
