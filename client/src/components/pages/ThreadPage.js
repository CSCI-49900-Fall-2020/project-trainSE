import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Header,
  Card,
  Label,
  Segment,
  Icon,
  Button,
} from "semantic-ui-react";
import { useRouteMatch, Link } from "react-router-dom";
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
  const [emptyResources, setEmptyResources] = useState(false);

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];

  // Helper function for formatting a thread title when there are no resources present
  const formatTitle = (emptyThread) => {
    emptyThread = emptyThread.replace(/-/g, " ");
    for (let i = 0; i < emptyThread.length; i++) {
      if (i === 0) {
        emptyThread =
          emptyThread.charAt(0).toUpperCase() + emptyThread.slice(1);
      } else if (emptyThread[i - 1] == " ") {
        emptyThread =
          emptyThread.slice(0, i) +
          emptyThread.charAt(i).toUpperCase() +
          emptyThread.slice(i + 1);
      }
    }
    return emptyThread;
  };

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
      // console.log(res.data);

      // If resources exist, update the state accordingly
      if (res.data.resources[0]) {
        setDifficulty(res.data.resources[0].difficultyLevel);
        setThreadTitle(res.data.resources[0].threadTitle);
        setRepositoryTitle(res.data.resources[0].repository);
        setResources(res.data.resources);
      }
      // If resources do not exist, update the state to refect emptiness
      else {
        setDifficulty("Empty");
        setThreadTitle(formatTitle(thread));
        setRepositoryTitle(formatTitle(repository));
        setEmptyResources(true);
      }
    }

    // Call the asynchronous function
    fetchThreads();
  }, []);

  // Helper function to map resource info to <ResourceItem/> component
  const resourceList = resources.map((resource) => (
    <ResourceItem resource={resource} />
  ));

  // Helper function to conditionally render difficulty colors
  let determineColor = (difficulty) => {
    if (difficulty === "Beginner") return "green";
    else if (difficulty === "Intermediate") return "yellow";
    else if (difficulty === "Advanced") return "red";
    else return "grey";
  };

  // Render this JSX/HTML if resources exist for this thread
  const populateResources = (
    <Card.Group itemsPerRow={3} stackable>
      {resourceList}
    </Card.Group>
  );

  // Render this JSX/HTML if resources do not exist for this thread
  const loading = (
    <Segment placeholder>
      <Header icon>
        <Icon name="question circle" />
        No resources are listed for this thread. Contribute the first resource.
      </Header>
      <Link to="/createResource">
        <Button primary>Add A Resource</Button>
      </Link>
    </Segment>
  );

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {/* {console.log("Resources after api call: ", resources)} */}
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* sidebar / drawer component */}
        <Grid.Column width={3}>
          <h1>Any ideas for what could be here?</h1>
        </Grid.Column>

        {/* Main Section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
          <Container style={{ marginBottom: "3%" }}>
            {/* The main header thread title */}
            <span>
              <Header as={"h1"} color="grey" style={{ marginBottom: "10px" }}>
                {threadTitle} Thread
              </Header>
            </span>
            {/* Specify the repository this thread belongs to */}
            <Label color="blue" size="large">
              {repositoryTitle}
            </Label>{" "}
            {/* Specify the difficulty level of this thread */}
            <Label color={determineColor(difficulty)} size="large">
              {difficulty}
            </Label>
          </Container>

          {/* Rendering the actual resources */}
          {/* Conditionally rendering if the reso */}
          {emptyResources ? loading : populateResources}
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
