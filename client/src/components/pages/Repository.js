import React, {useState, useEffect}from "react";
import { Grid, Header, Container,Segment } from "semantic-ui-react";
import {useParams} from "react-router-dom";
import SideContainer from "../layout/SideContainer";
import ThreadList from "../layout/ThreadList";

const Repository = () => {
  const path = useParams();

  return (
    <React.Fragment>
    
      <Grid columns={3} divided padded style={{ height: "100vh" }}>
        {/* side bar / drawer component */}
        <Grid.Column width={3} >
        
         
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
        {/* Main header */}
        <Segment> 
            <Header as={"h1"} color="grey">
              {path.repository}
            </Header>
          </Segment>
          {/* <Container style={{ marginBottom: "3%"}}>
            <Header as={"h1"} color="grey">
              {path.repository}
            </Header>
          </Container> */}

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
export default Repository;
