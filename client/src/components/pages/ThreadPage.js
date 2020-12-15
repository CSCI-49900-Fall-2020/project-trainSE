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
  Dropdown,
} from "semantic-ui-react";
import { useRouteMatch, Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import SideContainer from "../layout/SideContainer";
import ResourceItem from "../layout/ResourceItem";

// The ThreadPage component as a functional component
const ThreadPage = ({ auth: { user } }) => {
  // -------------------- STATIC DATA --------------------------------------------------

  const sortingOptions = [
    {
      key: "most liked",
      text: "Most Liked",
      value: "Most Liked",
    },
    {
      key: "recent to oldest",
      text: "Recent to Oldest",
      value: "Recent to Oldest",
    },
    {
      key: "oldest to recent",
      text: "Oldest to Recent",
      value: "Oldest to Recent",
    },
  ];
  // -------------------- STATIC DATA --------------------------------------------------

  // -------------------- LOCAL REACT STATE --------------------------------------------------

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
  // -------------------- LOCAL REACT STATE --------------------------------------------------

  // -------------------- MISCELLANEOUS --------------------------------------------------
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

  // Helper function to map resource info to <ResourceItem/> component
  const resourceList = resources.map((resource) => (
    <ResourceItem resource={resource} />
  ));
  // -------------------- MISCELLANEOUS --------------------------------------------------

  // -------------------- USE EFFECT API CALLS --------------------------------------------------
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
  // -------------------- USE EFFECT API CALLS --------------------------------------------------

  // -------------------- CONDITIONALLY RENDERED HELPER FUNCTIONS --------------------------------------------------
  // Helper function to conditionally render difficulty colors
  let determineColor = (difficulty) => {
    if (difficulty === "Beginner") return "green";
    else if (difficulty === "Intermediate") return "yellow";
    else if (difficulty === "Advanced") return "red";
    else return "grey";
  };

  // Render this JSX/HTML if resources exist for this thread
  const populateResources = (
    <Container>
      <Card.Group itemsPerRow={3} stackable>
        {resourceList}
      </Card.Group>
    </Container>
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
  // -------------------- CONDITIONALLY RENDERED HELPER FUNCTIONS --------------------------------------------------

  // If a choice is made from the dropdown to sort
  const onChangeDropdown = (e, result) => {
    console.log("This is the triggered event: ", e);
    console.log("This is the actual values: ", result);
    const { value } = result || e.target;
    console.log(value);

    // Important article:
    //https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p
    // Sorting while updating the UI requires use of the spread operator

    // If a user clicked on to sort by most likes
    if (value === "Most Liked") {
      // Sort by ascending to descending likes
      const organizedByMostLiked = [...resources].sort(
        (resource1, resource2) => {
          return resource2.likes - resource1.likes;
        }
      );
      console.log(organizedByMostLiked);
      setResources(organizedByMostLiked);
    }
    // If a user clicked on to sort by most recent to oldest
    else if (value === "Recent to Oldest") {
      const organizedByMostRecent = [...resources].sort(
        (resource1, resource2) => {
          // return resource1.timestamp - resource2.timestamp;
        }
      );
      // console.log(organizedByMostLiked);
      // setResources(organizedByMostRecent);
    }
    // If a user clicked on to sort by oldest to recent
    else if (value === "Oldest to Recent") {
      const organizedByOldest = [...resources].sort((resource1, resource2) => {
        // console.log(resource2.timestamp - resource1.timestamp);
      });
      // console.log(organizedByMostLiked);
      // setResources(organizedByOldest);
    }

    // Update the state of the resource based on the user's choice
    // setResource({ ...resource, [name]: value });
  };

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {/* {console.log("Resources after api call: ", resources)} */}
      {/* Main Section */}
      <Container>
        {/* The main header thread title */}
        <Grid style={{ backgroundColor: "teal", padding: "45px 0 25px 0" }}>
          <span>
            <Header as="h1" textAlign="center" inverted>
              {threadTitle} Thread
            </Header>
          </span>
        </Grid>
        <Grid style={{ padding: "1% 0 2% 1%" }}>
          {/* Specify the repository this thread belongs to */}
          <Label color="blue" size="large">
            {repositoryTitle}
          </Label>
          {/* Specify the difficulty level of this thread */}
          <Label color={determineColor(difficulty)} size="large">
            {difficulty}
          </Label>
          {/* Dropdown to sort */}
          <Dropdown
            placeholder="Sort By"
            selection
            clearable
            options={sortingOptions}
            onChange={onChangeDropdown}
          />
        </Grid>
      </Container>

      {/* Rendering the actual resources */}
      {/* Conditionally rendering if the repo are empty or they exist */}
      {emptyResources ? loading : populateResources}
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
