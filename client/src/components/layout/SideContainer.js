import React from "react";
import { Header, Segment, Container } from "semantic-ui-react";
// Might be use for announcements or repository rules 
const sideContainer = () => {
  return (
    <Container>
      <Header as="h4" attached="top" block color="blue">
      Lorem ipsum
      </Header>
      <Segment attached="bottom">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Segment>
    </Container>
  );
};
export default sideContainer;