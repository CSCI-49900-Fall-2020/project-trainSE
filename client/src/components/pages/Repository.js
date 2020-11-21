import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Segment, Button } from "semantic-ui-react";
import { useRouteMatch } from "react-router-dom";
// import SideContainer from "../layout/SideContainer";
import ThreadList from "../layout/ThreadList";

// The Repository component as a functional component
const Repository = ({ auth: { user } }) => {
  // From the auth global state, extract the user property

  // Initial placebo data for Dashboard's local state
  const [threads, setThread] = useState([
    {
      beginnerThreads: [],
      intermediateThreads: [],
      advancedThreads: [],
      repository: "",
    },
  ]);
  // { thread: "Variables", level: "Beginner" },
  // { thread: "Conditions", level: "Beginner" },
  // { thread: "Chained Conditionals", level: "Beginner" },
  // { thread: "Operators", level: "Beginner" },
  // { thread: "Control Flow", level: "Beginner" },
  // { thread: "Loops and Iterables", level: "Beginner" },
  // { thread: "Basic Data Structures", level: "Beginner" },
  // { thread: "Functions", level: "Beginner" },
  // { thread: "Mutable vs Immutable", level: "Beginner" },
  // { thread: "Common Methods", level: "Beginner" },
  // { thread: "File IO", level: "Beginner" },
  // { thread: "Object Oriented Programming", level: "Intermediate" },
  // { thread: "Data Structures", level: "Intermediate" },
  // { thread: "Comprehensions", level: "Intermediate" },
  // { thread: "Lambda Functions", level: "Intermediate" },
  // { thread: "Map and Filter", level: "Intermediate" },
  // { thread: "Collections", level: "Intermediate" },
  // { thread: "*args & **kwargs", level: "Intermediate" },
  // { thread: "Inheritance", level: "Intermediate" },
  // { thread: "Dunder Methods", level: "Intermediate" },
  // { thread: "PIP", level: "Intermediate" },
  // { thread: "Decorators", level: "Advanced" },
  // { thread: "Generators", level: "Advanced" },
  // { thread: "Context Managers", level: "Advanced" },
  // { thread: "Metaclasses", level: "Advanced" },
  // { thread: "Concurrency", level: "Advanced" },
  // { thread: "Parallelism", level: "Advanced" },
  // { thread: "Testing", level: "Advanced" },
  // { thread: "Packages", level: "Advanced" },
  // { thread: "Cython", level: "Advanced" },
  // });

  // const path = useParams();

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];

  // Making side effect Axios call to retrieve the domain names
  useEffect(() => {
    async function fetchRepoThreads() {
      // Make an asynchronous axios call to the specified backend API route
      const res = await Axios.get(
        `/api/domain/fetchThreads/${discipline}/${repository}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      console.log(res.data.threads);
      // setSectionData(res.data.domains);
      // console.log(res.data.beginnerThreads);
      setThread(res.data.threads);
    }

    // Call the asynchronous function
    fetchRepoThreads();
  }, []);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      <Segment
        raised
        compact
        textAlign="center"
        inverted
        color="teal"
        size="massive"
        style={{ margin: "15px auto" }}
      >
        {threads[0].repository} Repository
        <Button fluid compact style={{ marginTop: "10px" }}>
          Open A New Thread?
        </Button>
      </Segment>

      {/* A Grid maintaining three columns */}
      <Grid columns={3} divided padded style={{ height: "60vh" }}>
        {/* 1st colmun: Beginner Threads */}
        <Grid.Column style={{ backgroundColor: "#CCF1D2" }}>
          <ThreadList level="Beginner" threads={threads[0].beginnerThreads} />
          <Segment textAlign="center" style={{ margin: "15px auto" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Segment>
        </Grid.Column>

        {/* 2nd column: Intermediate Threads */}
        <Grid.Column style={{ backgroundColor: "#6EC6BA" }}>
          <ThreadList
            level="Intermediate"
            threads={threads[0].intermediateThreads}
          />

          <Segment textAlign="center" style={{ margin: "15px auto" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Segment>
        </Grid.Column>

        {/* 3rd column: Advanced Threads */}
        <Grid.Column style={{ backgroundColor: "#008080" }}>
          <ThreadList level="Advanced" threads={threads[0].advancedThreads} />
          <Segment textAlign="center" style={{ margin: "15px auto" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

// Prop validation for the Repository component
Repository.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called auth
  // Now, we can use auth in this component
  auth: state.auth,
});

// This Repository component is connected to the Redux store through connect
// mapStateToProps action creator is tied to Redux, so connect() further ties this functionalty to the Repository component
export default connect(mapStateToProps)(Repository);
