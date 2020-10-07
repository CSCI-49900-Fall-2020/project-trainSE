import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  msgBox: {
    margin: "auto",
    width: "50%",
  },
  box: {
    margin: "20px",
  },
}));

const AlertMsg = ({ alerts }) => {
  // alerts prop is an alias for the global alert object in the global Redux store

  const classes = useStyles();
  // As long as alerts is not null and alerts is not an empty array
  // Then, there are alerts to display. Render each alert using map and <Alert>
  return (
    <div className={classes.msgBox}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert
            className={classes.box}
            key={alert.id}
            severity={alert.alertType}
          >
            <AlertTitle>Error</AlertTitle>
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
};

// Prop validation for the Alert component
AlertMsg.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses alert
  // We map the alert global state to a prop called alerts
  // Now, we can use alerts in this component
  alerts: state.alert,
});

// This AlertMsg component is connected to the Redux store through connect
// mapStateToProps is tied to Redux, so connect() further ties this functionalty to the AlertMsg component
export default connect(mapStateToProps)(AlertMsg);
