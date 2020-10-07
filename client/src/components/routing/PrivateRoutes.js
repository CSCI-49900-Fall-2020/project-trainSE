import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// PrivateRoute as a function component
// Explanation of PrivateRoute's parameters
// component is a Prop from the <PrivateRoute component="" />
// Whatever was the value for the component prop, uppercase Component will be an alias
// Helpful: https://dev.to/rsanchezp/destructuring-with-an-alias-ima

// auth prop is an alias for the auth global store
// We want to destructure isAuthenticated and isLoading from the auth prop
// logout refers to the action creator

/* Then, take all remaining properties defined on the props object and
    collect them inside an argument called rest. Your simply pulling off the
    rest (hence why the argument is named that) of the properties defined on
    your props object into a new argument called rest.
    Helpful: https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx
*/
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading },
  ...rest
}) => (
  <Route
    // Putting the rest of the PrivateRoute's property into this new Route
    {...rest}
    // render prop
    render={(props) =>
      // If isAuthenticated, then render the Component with its props
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

// Prop validation for the Alert component
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// Our root reducer in reducer/index.js uses alert
// We map the alert global state to a prop called alerts
// Now, we can use alerts in this component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// This AlertMsg component is connected to the Redux store through connect
// mapStateToProps is tied to Redux, so connect() further ties this functionalty to the AlertMsg component
export default connect(mapStateToProps)(PrivateRoute);
