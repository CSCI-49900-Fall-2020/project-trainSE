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
  Label,
} from "semantic-ui-react";
// import Footer from "../layout/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Home.css";

function Home({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <HeroSection />

      {/* Section explaining TrainSE purpose */}
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" color="teal" style={{ fontSize: "2em" }}>
                Our Story
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Do you want to explore a new topic? Someone would've already
                told you to "Google It." Don't get us wrong, Google's advocacy
                for open source education has drastically changed the way we've
                learned in the last two decades. Regardless, one must excavate
                the depths of the internet and perform a trial and error to find
                what they're actually looking for. The first search result is
                sometimes a dense reosurce bogged down by jargon and complex
                phrasing that intimidates beginners. This issue worsens in the
                tech where merely learning a new framework can be overwhelming
                due to extraneous tutorials that all teach the same thing. Which
                one is best?
              </p>
              <Header as="h3" color="teal" style={{ fontSize: "2em" }}>
                Let's Streamline Computer Science
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                We want all backgrounds (whether it be from school, bootcamps,
                or self-taught) to have a clear, concise, and friendly
                introduction to some of Computer Science's most puzzling topics.
                With your help (and the community at large), we can monitor,
                maintain, and share the best resources that make Computer
                Science more approachable and less daunting. We strive to
                demystify the verbose until you're ready to face more dense
                resources. In short, let's have more accountability in the
                creation of materials and escape the cycle of useless tutorials.
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
                When learning a new topic, you want to incrementally gain an
                understanding through smaller modules. Instead of reading
                through large textbooks, learn a topic through articles, videos,
                and concise material.
              </p>
            </Grid.Column>
            {/* Second colymn */}
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Icon name="users" size="huge" />
              <Header as="h3" style={{ fontSize: "2em" }} color="teal">
                Community approved materials
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                The tech community is in charge here - not Google's searching
                algorithms. We aim for our resources to contain minimal jargon,
                presents visual aids, makes real world analogies, etc. And we
                will protect this standard.
              </p>
            </Grid.Column>
            {/* Third column */}
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Icon name="clock" size="huge" />
              <Header as="h3" style={{ fontSize: "2em" }} color="teal">
                Save time from googling
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Scavenging the webpage for that hidden gem? Not sure if you're
                using the right keywords to best describe your query?
                Drastically reduce your research time by quickly finding a
                resource through our convenient UI indexed by topic and
                experience level.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Section explaining the rules and user support */}
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Support the Following Domains of Computer Science
            <Label color="teal">More to Come!</Label>
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

const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called isAuthenticated
  // Now, we can use isAuthenticated as a prop in this component
  isAuthenticated: state.auth.isAuthenticated,
});

// This Login component is connected to the Redux store through connect
// mapStateToProps and login action creator are tied to Redux, so connect() further ties this functionalty to the Login component
export default connect(mapStateToProps)(Home);
