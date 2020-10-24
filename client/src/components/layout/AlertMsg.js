import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

const AlertMsg = ({ alerts }) => {
  // alerts prop is an alias for the global alert object in the global Redux store

  // As long as alerts is not null and alerts is not an empty array
  // Then, there are alerts to display. Render each alert using map and <Message>
  return (
    <div
      style={{
        margin: "auto",
        width: "400px",
        marginTop: "20px",
        paddingTop: "50px",
      }}
    >
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Message key={alert.id} negative>
            <Message.Header>Error</Message.Header>
            {alert.msg}
          </Message>
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
