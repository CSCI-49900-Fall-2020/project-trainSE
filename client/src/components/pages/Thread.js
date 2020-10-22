import React from "react";
import { Grid,Container, Header, Card , Segment} from "semantic-ui-react";

import SideContainer from "../layout/SideContainer";
import ResourceItem from "../layout/ResourceItem";

const Thread = () => {
  const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];
  const resourceList = fakeData.map(() => <ResourceItem />);
  return (
    <React.Fragment>
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* side bar / drawer component */}
        <Grid.Column width={3}>
         
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
        <Segment>
            <Header as={"h1"} color="grey">
              Thread title
            </Header>
        </Segment>
          {/* <Container style={{ marginBottom: "3%" }}>
            <Header as={"h1"} color="grey">
              Thread title
            </Header>
          </Container> */}
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
export default Thread;
