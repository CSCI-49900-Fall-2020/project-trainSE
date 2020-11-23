import React from "react";
import "../../App.js";
import {
  Segment,
  Button,
  Header,
  Image,
  Grid,
  Card,
  Input,
  Container,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Home.css";

function ProfilePage({ isAuthenticated }) {
  
    return (
        
        <React.Fragment>
            <Segment style={{ padding: "8em 4em"}} vertical>
                <Grid columns={1} divided padded style={{ height: "60vh"}} >
                <Container>
                    <Grid columns="2" divided  style={{backgroundColor: "#CCF1D2"}}>
                    <Grid.Column width={4}>
                    <Grid.Row style={{ padding: "2em 1em"}} >
                        {/* default image */}
                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' circular />
                    </Grid.Row>
                    <Grid.Row>
                        <Card>
                            <Card.Content>
                                <Card.Header content='User Information' style={{ fontSize: '1em', padding: "1em 0em" }}/>
                                <Card.Description content='Username'/>
                                <Input disabled placeholder='Username' style={{ padding: "1em 0em" }}/>
                                <Card.Description content='Name' />
                                <Input disabled placeholder='Name' style={{ padding: "1em 0em" }}/>
                                <Card.Description content='Email' />
                                <Input disabled placeholder='Email' style={{ padding: "1em 0em" }}/>
                                <Card.Header content='Change Password' style={{ fontSize: '1em', padding: "1em 0em" }}/>
                                <Card.Description content='Enter Current Password' />
                                <Input placeholder='Current Password' style={{ padding: "1em 0em" }}/>
                                <Card.Description content='Enter New Password' />
                                <Input placeholder='New Password' style={{ padding: "1em 0em" }}/>
                                <Card.Description content='Re-enter New Password' />
                                <Input placeholder='Re-enter New Password' style={{ padding: "1em 0em" }}/>
                                <Button color='teal'>Submit</Button>
                            </Card.Content>
                        </Card>
                    </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header as='h3' style={{ fontSize: '1.5em' }}>Achievements</Header>
                        <Segment raised>Pellentesque habitant morbi tristique senectus.</Segment>

                        <Header as='h3' style={{ fontSize: '1.5em' }}>Description</Header>
                        <Segment textAlign="center" style={{ margin: "15px auto" }} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Segment>

                        <Header as='h3' style={{ fontSize: '1.5em' }}>Favorite Resources</Header>
                        <Segment raised>Pellentesque habitant morbi tristique senectus.</Segment>

                    </Grid.Column>
                </Grid>
                </Container>
                </Grid>
            </Segment>
        </React.Fragment>
        
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
  export default connect(mapStateToProps)(ProfilePage);