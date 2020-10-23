import React, {useState, useEffect}from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Grid, Header, Container,Segment } from "semantic-ui-react";
import {useParams} from "react-router-dom";
import SideContainer from "../layout/SideContainer";
import ThreadList from "../layout/ThreadList";

const Repository = ({ auth: { user } }) => {
  const path = useParams();

  return (
    <React.Fragment>
    
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* side bar / drawer component */}
        <Grid.Column width={3} >
        <h1>Sidebar</h1>  
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
        {/* Main header */}
          <Container style={{ marginBottom: "3%"}}>
            <Header as={"h1"} color="grey">
              {path.repository}
            </Header>
          </Container>

          {/* List of levels   */}
          <Container>
            <ThreadList level="beginner" />
            <ThreadList level="intermediate" />
            <ThreadList level="advanced" />
          </Container>
        </Grid.Column>

        {/* left section */}
        <Grid.Column width={4} >
          <SideContainer />
        </Grid.Column>
      </Grid>
    </React.Fragment> 
  );
};

// export default Repository;
const mapStateToProps = (state) => ({
  auth: state.auth,
  //   profile: state.profile,
});

export default connect(mapStateToProps)(Repository);
