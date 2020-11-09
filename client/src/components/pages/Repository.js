import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Header, Container, Segment } from "semantic-ui-react";
import { useParams, Redirect, useRouteMatch } from "react-router-dom";
import SideContainer from "../layout/SideContainer";
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

  // Filter through the threads array to place data in its own array based on level
  // const beginnerThreads = threads.filter(
  //   (thread) => thread.level === "Beginner"
  // );
  // const intermediateThreads = threads.filter(
  //   (thread) => thread.level === "Intermediate"
  // );
  // const advancedThreads = threads.filter(
  //   (thread) => thread.level === "Advanced"
  // );
  // const beginnerThreads = threads.beginnerThreads;
  // const intermediateThreads = threads.intermediateThreads;
  // const advancedThreads = threads.advancedThreads;

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {/* A Grid maintaining three columns */}
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* 1st colmun: side bar / drawer component */}
        <Grid.Column width={4}>
          <h1>Sidebar</h1>
        </Grid.Column>

        {/* 2nd column: main section housing the threads */}
        <Grid.Column width={7} style={{ backgroundColor: "#e2e6f0" }}>
          {/* Main header */}
          <Container style={{ marginBottom: "3%" }}>
            <Header as={"h1"} color="grey">
              {threads[0].repository} Repository
              {/* {path.repository} */}
            </Header>
          </Container>

          {/* List of levels   */}
          <Container>
            <ThreadList level="Beginner" threads={threads[0].beginnerThreads} />
            <ThreadList
              level="Intermediate"
              threads={threads[0].intermediateThreads}
            />
            <ThreadList level="Advanced" threads={threads[0].advancedThreads} />
          </Container>
        </Grid.Column>

        {/* 3rd column: left section */}
        <Grid.Column width={4}>
          <SideContainer />
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
