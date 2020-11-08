import React from "react";
import { Header, Segment, Container } from "semantic-ui-react";
// Might be use for announcements or repository rules
const sideContainer = () => {
  return (
    <Container>
      <Header as="h4" attached="top" block color="teal">
        Lorem ipsum
      </Header>
      <Segment attached="bottom">
        Any ideas for what could be here? Maybe a bio of the thread? But that
        would mean having extra data (an extra key: value). For example, the key
        could be "description" and the value could be "List comprehensions is a
        way to abbreviate the syntax of a for loop.....". This means we would
        have custom descriptions for every thread in every repository however!
      </Segment>
    </Container>
  );
};
export default sideContainer;
