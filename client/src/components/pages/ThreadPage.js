import React from "react";
import { Grid, Container, Header, Card, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SideContainer from "../layout/SideContainer";
import ResourceItem from "../layout/ResourceItem";

// The ThreadPage component as a functional component
const ThreadPage = ({ auth: { user } }) => {
  // Placebo data
  const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];
  const resourceList = fakeData.map(() => <ResourceItem />);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* sidebar / drawer component */}
        <Grid.Column width={3}>
          <h1>Sidebar</h1>
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
          <Container style={{ marginBottom: "3%" }}>
            <Header as={"h1"} color="grey">
              Python: Functions Thread
            </Header>
          </Container>

          {/* resources */}
          <Card.Group itemsPerRow={3} stackable>
            {resourceList}
          </Card.Group>
        </Grid.Column>

        {/* left section */}
        <Grid.Column width={4} s>
          <SideContainer />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

// Prop validation for the Repository component
ThreadPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called auth
  // Now, we can use auth in this component
  auth: state.auth,
  //   profile: state.profile,
});

// This ThreadPage component is connected to the Redux store through connect
// mapStateToProps action creator is tied to Redux, so connect() further ties this functionalty to the ThreadPage component
export default connect(mapStateToProps)(ThreadPage);
