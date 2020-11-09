import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Header,
  Card,
  Segment,
  Label,
} from "semantic-ui-react";
import { useParams, Redirect, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SideContainer from "../layout/SideContainer";
import ResourceItem from "../layout/ResourceItem";

// The ThreadPage component as a functional component
const ThreadPage = ({ auth: { user } }) => {
  const [resources, setResources] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const [repositoryTitle, setRepositoryTitle] = useState("");

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];

  // Making side effect Axios call to retrieve the resources belonging to the thread specified in the url
  useEffect(() => {
    async function fetchThreads() {
      // Make an asynchronous axios call to the specified backend API route
      const res = await Axios.get(
        `/api/domain/fetchResources/${discipline}/${repository}/${thread}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      // Update the state accordingly
      // console.log(res.data);
      setDifficulty(res.data.resources[0].difficultyLevel);
      setThreadTitle(res.data.resources[0].threadTitle);
      setRepositoryTitle(res.data.resources[0].repository);
      setResources(res.data.resources);
    }

    // Call the asynchronous function
    fetchThreads();
  }, []);

  const resourceList = resources.map((resource) => (
    <ResourceItem resource={resource} />
  ));

  let determineColor = (difficulty) => {
    if (difficulty === "Beginner") return "green";
    else if (difficulty === "Intermediate") return "yellow";
    else if (difficulty === "Advanced") return "red";
    else return "orange";
  };

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {console.log("Resources after api call: ", resources)}
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* sidebar / drawer component */}
        <Grid.Column width={3}>
          <h1>Any ideas for what could be here?</h1>
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
          <Container style={{ marginBottom: "3%" }}>
            {/* Specify the repository this thread belongs to */}
            {/* The main header thread title */}
            <span>
              <Header as={"h1"} color="grey" style={{ marginBottom: "10px" }}>
                {threadTitle} Thread
              </Header>
            </span>
            {/* Specify the difficulty level of this thread */}
            <Label color="blue" size="large">
              {repositoryTitle}
            </Label>{" "}
            <Label color={determineColor(difficulty)} size="large">
              {difficulty}
            </Label>
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
