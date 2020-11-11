import React from "react";
import "../../App.js";
import HeroSection from "../layout/HeroSection";
import {
  Segment,
  Button,
  Header,
  Image,
  Grid,
  Icon,
  Container,
} from "semantic-ui-react";
// import Footer from "../layout/Footer";
import "./Home.css";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Section explaining TrainSE purpose */}
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" color="teal" style={{ fontSize: "2em" }}>
                Explain TrainSE's purpose and mission statement
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <Header as="h3" color="teal" style={{ fontSize: "2em" }}>
                Maybe a statistic here
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://image.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Section explaining site features through icons */}
      <Segment style={{ padding: "0em" }} vertical inverted>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            {/* First column */}
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Icon name="code" size="huge" />
              <Header as="h3" style={{ fontSize: "2em" }} color="teal">
                Learn CS through resources
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </Grid.Column>
            {/* Second colymn */}
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Icon name="users" size="huge" />
              <Header as="h3" style={{ fontSize: "2em" }} color="teal">
                Community approved materials
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </Grid.Column>
            {/* Third column */}
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Icon name="clock" size="huge" />
              <Header as="h3" style={{ fontSize: "2em" }} color="teal">
                Save time from googling
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Section explaining the rules and user support */}
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Explain the rules of the website or the CS domains we support
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Instead of focusing on content creation and hard work, we have
            learned how to master the art of doing nothing by providing massive
            amounts of whitespace and generic content that can seem massive,
            monolithic and worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>
        </Container>
      </Segment>
      {/* <Footer /> */}
    </>
  );
}
