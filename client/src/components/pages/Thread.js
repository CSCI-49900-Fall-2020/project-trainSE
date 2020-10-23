import React from "react";
import { Grid,Container, Header, Card , Segment} from "semantic-ui-react";
import { connect } from "react-redux";

import SideContainer from "../layout/SideContainer";
import ResourceItem from "../layout/ResourceItem";

const Thread = ({ auth: { user } }) => {
  const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];
  const resourceList = fakeData.map(() => <ResourceItem />);
  return (
    <React.Fragment>
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* sidebar / drawer component */}
        <Grid.Column width={3}>
         <h1>Sidebar</h1>
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
          <Container style={{ marginBottom: "3%" }}>
            <Header as={"h1"} color="grey">
              Thread title
            </Header>
          </Container>

          {/* resources */}
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
// export default Thread;

const mapStateToProps = (state) => ({
  auth: state.auth,
  //   profile: state.profile,
});

export default connect(mapStateToProps)(Thread);
