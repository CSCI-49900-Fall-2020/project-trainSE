import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { Header, Grid, Icon, Card, Container } from "semantic-ui-react";
// import { getCurrentProfile } from '../../actions/profile';

// The Dashboard component as a functional component
const Dashboard = ({ auth: { user } }) => {
  // From the auth global state, extract the user property

  // Initial placebo data for Dashboard's local state
  const [sectionData, setSection] = useState([
    {
      discipline: "Languages",
      repositories: [
        "Python",
        "JavaScript",
        "C++",
        "Java",
        "HTML/CSS",
        "Swift",
      ],
    },
    {
      discipline: "Mathematics",
      repositories: [
        "Calculus I",
        "Calculus II",
        "Linear Algebra",
        "Statistics",
        "Discrete Structures",
        "Number Theory",
      ],
    },
    {
      discipline: "Databases",
      repositories: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
      discipline: "Architecture",
      repositories: ["MIPS", "x86", "Operating Systems"],
    },
    {
      discipline: "Algorithms and Data Structures",
      repositories: [
        "Searching",
        "Sorting",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
        "Hash Tables",
        "Graphs",
        "Dynamic Programming",
      ],
    },
    {
      discipline: "Artifical Intelligence",
      repositories: ["Natural Language Processing"],
    },
  ]);

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  console.log("Path: ", path);
  console.log("URL: ", url);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <>
      {/* Greeting Message */}
      <Grid columns="equal">
        {/* First column dealing with left icons */}
        <Grid.Column
          color="teal"
          style={{ paddingTop: "35px" }}
          textAlign="center"
        >
          <Icon
            size="huge"
            name="code"
            style={{ margin: "auto 20px auto 20px" }}
          />
          <Icon
            size="huge"
            name="code branch"
            style={{ margin: "auto 20px auto 20px" }}
          />
          <Icon
            size="huge"
            name="microchip"
            style={{ margin: "auto 20px auto 20px" }}
          />
        </Grid.Column>

        {/* Second column dealing with the greeting message */}
        <Grid.Column color="teal" style={{ paddingTop: "35px" }} width={8}>
          <Header as="h1" textAlign="center" inverted>
            Welcome to your DashBoard, {user.username}!
            <Header.Subheader textAlign="center" style={{ paddingTop: "10px" }}>
              Which Computer Science topic will you research today?
            </Header.Subheader>
          </Header>
        </Grid.Column>

        {/* Third column dealing with right icons */}
        <Grid.Column
          color="teal"
          style={{ paddingTop: "35px" }}
          textAlign="center"
        >
          <Icon
            size="huge"
            name="keyboard"
            style={{ margin: "auto 20px auto 20px" }}
          />
          <Icon
            size="huge"
            name="computer"
            style={{ margin: "auto 20px auto 20px" }}
          />
          <Icon
            size="huge"
            name="terminal"
            style={{ margin: "auto 20px auto 20px" }}
          />
        </Grid.Column>
      </Grid>

      {/* Rendering the cards */}
      {/* sectionData is an array, map through each object in the array */}
      {sectionData.map((specificSection) => {
        return (
          <Container style={{ marginTop: "40px" }}>
            {/* Render the discipline as its own section */}
            <Header as="h1">{specificSection.discipline}</Header>
            {/* All the repositories associated with its discipline */}
            <div>
              <Card.Group itemsPerRow={4}>
                {/* specificSection.repositories is an array, map through each string aka repository name in the array */}
                {specificSection.repositories.map((repository) => {
                  return (
                    <Card raised style={{ padding: "25px" }} color="teal">
                      {/* Each repository will render its own card */}
                      <Link to={`repository/python`}>
                        <Header textAlign="center" as="h1" color="teal">
                          {repository}
                        </Header>{" "}
                      </Link>
                    </Card>
                  );
                })}
              </Card.Group>
            </div>
          </Container>
        );
      })}
    </>
  );
};

// Prop validation for the Dashboard component
Dashboard.propTypes = {
  //   getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called auth
  // Now, we can use auth in this component
  auth: state.auth,
});

// This Dashboard component is connected to the Redux store through connect
// mapStateToProps action creator is tied to Redux, so connect() further ties this functionalty to the Dashboard component
export default connect(mapStateToProps)(Dashboard);
