import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// https://stackoverflow.com/questions/55796665/react-material-ui-router-redirect-button

// Material UI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// The Navbar component as a functional component
const NavBar = ({ auth: { isAuthenticated, isLoading }, logout }) => {
  // auth prop is an alias for the auth global store
  // We want to destructure isAuthenticated and isLoading from the auth prop
  // logout refers to the action creator
  const classes = useStyles();

  // Render this code of JSX/HTML if the user is logged in
  const authLinks = (
    <Toolbar>
      {/* Dashboard */}
      <Typography variant="h6" color="inherit" className={classes.title}>
        Dashboard
      </Typography>
      {/* Logout Buttons */}
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </Toolbar>
  );

  // Render this code of JSX/HTML if the user is not logged in
  const guestLinks = (
    <Toolbar>
      {/* Menu button */}
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      {/* News Header */}
      <Typography variant="h6" className={classes.title}>
        News
      </Typography>
      {/* Button */}
      <Button color="inherit" href="/register">
        Sign Up
      </Button>
      <Button color="inherit" href="/login">
        Login
      </Button>
    </Toolbar>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {/* Logo */}
        <Typography variant="title" color="inherit" className={classes.title}>
          TrainSE
        </Typography>
        {/* Conditionally render parts of the navbar */}
        {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </AppBar>
    </div>
  );
};

// Prop validation for the NavBat component
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

export default connect(mapStateToProps, { logout })(NavBar);
