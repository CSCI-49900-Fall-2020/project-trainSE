import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Menu,
  Dropdown,
  Container,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

// https://stackoverflow.com/questions/55796665/react-material-ui-router-redirect-button

// The Navbar component as a functional component
const NavBar = ({ auth: { isAuthenticated, isLoading }, logout }) => {
  // auth prop is an alias for the auth global store
  // We want to destructure isAuthenticated and isLoading from the auth prop
  // logout refers to the action creator

  // Render this code of JSX/HTML if the user is logged in
  const authLinks = (
    <>
      {/* For Narvisha */}
      {/* <Menu.Item as="a">
        <Link to="/createResource">Submit A Resource</Link>
      </Menu.Item> */}
      {/* For Narvisha */}
      <Dropdown item simple text="Contribute">
        <Dropdown.Menu>
          <Dropdown.Item as="a">
            <Link to="/createResource" style={{ color: "black" }}>
              Submit a Resource
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>Open a Thread</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className="dropdown icon" />
            <span className="text">Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item position="right">
        <Menu.Item>
          <Button as="a" color="teal">
            <Icon name="user" />
            Profile
          </Button>
        </Menu.Item>
        <Button as="a" onClick={logout}>
          Log Out
        </Button>
      </Menu.Item>
    </>
  );

  // Render this code of JSX/HTML if the user is not logged in
  const guestLinks = (
    <Menu.Item position="right">
      <Button as="a" href="/login">
        Log in
      </Button>
      <Button as="a" style={{ marginLeft: "0.5em" }} href="/register">
        Sign Up
      </Button>
    </Menu.Item>
  );

  // Determine where the logo home button should redirect to based on authentication
  const determineHome = isAuthenticated ? "/dashboard" : "/";

  return (
    <Menu fixed="top" inverted>
      <Container>
        {/* Logo */}
        <Menu.Item as="a" header href={determineHome}>
          <Image
            size="mini"
            circular
            src="https://image.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg"
            style={{ marginRight: "1.5em" }}
          />
          TrainSE
        </Menu.Item>
        {/* Conditionally render parts of the navbar */}
        {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </Container>
    </Menu>
  );
};

// Prop validation for the NavBar component
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop also called auth
  // Now, we can use auth (the prop) in this component
  auth: state.auth,
});

// This Navbar component is connected to the Redux store through connect
// mapStateToProps and logout action creator are tied to Redux, so connect() further ties this functionalty to the Navbar component
export default connect(mapStateToProps, { logout })(NavBar);
