import React, { useState, useEffect } from "react";
import {
  Segment,
  Divider,
  Header,
  Image,
  Grid,
  Card,
  Popup,
  Container,
  Label,
  List,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileLikedResources from "../layout/ProfileLikedResources";
import Axios from "axios";
// import { Redirect } from "react-router-dom";
// import "./Home.css";

// The ProfilePage component as a functional component
function ProfilePage({ auth: { user } }) {
  // -------------------- LOCAL REACT STATE --------------------------------------------------

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [likedResources, setLikedResources] = useState([]);
  // -------------------- LOCAL REACT STATE --------------------------------------------------

  // -------------------- API CALL --------------------------------------------------
  useEffect(() => {
    async function fetchUser() {
      const res = await Axios.get(`/api/users/getUser/${user._id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      console.log(res.data);
      setUserProfile(res.data.foundUser);
      setLikedResources(res.data.foundUser.likedResources);
      setLoading(false);
      //   console.log(userProfile);
    }

    fetchUser();
  }, []);
  // -------------------- API CALL --------------------------------------------------

  // -------------------- EVENT TRIGGERS --------------------------------------------------
  const removeResourceFromProfile = (resource_id) => {
    // console.log(resource_id);
    const removeResource = async () => {
      const res = await Axios.post(
        `/api/users/deleteResource/${user.username}/${resource_id}`,
        null,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data.result);
      if (res.data.result) {
        let updatedResources = likedResources.filter(
          (resource) => resource._id != resource_id
        );
        setLikedResources(updatedResources);
      }
    };

    removeResource();
  };
  // -------------------- EVENT TRIGGERS --------------------------------------------------

  // -------------------- CONDITIONAL COMPONENTS --------------------------------------------------
  // Rendering the column of a user's contributed resources
  const contributedResourcesColumn = loading ? (
    <></>
  ) : (
    <Grid.Column>
      <Header as="h4" textAlign="center">
        Resources
      </Header>
      <List>
        {/* If a user did not contribute a resource, render the segment message */}
        {/* If a user contributed at least one resource, render the amount of resources */}
        {userProfile.contributedResources.length == 0 ? (
          <Segment raised>
            <Header as="h5" textAlign="center">
              You did not contribute any resources
            </Header>
          </Segment>
        ) : (
          userProfile.contributedResources.map((resource) => {
            return (
              <List.Item>
                <List.Icon
                  name={
                    resource.resourceType == "Video"
                      ? "youtube"
                      : "file alternate"
                  }
                  color={resource.resourceType == "Video" ? "red" : "blue"}
                ></List.Icon>
                <List.Content>
                  <List.Header>{resource.resourceTitle}</List.Header>
                </List.Content>
              </List.Item>
            );
          })
        )}
      </List>
    </Grid.Column>
  );

  // Rendering the column of a user's opened threads
  const contributedThreadsColumn = loading ? (
    <></>
  ) : (
    <Grid.Column>
      <Header as="h4" textAlign="center">
        Opened Threads
      </Header>
      <List>
        {userProfile.openThreads.length == 0 ? (
          <Segment raised>
            <Header as="h5" textAlign="center">
              You did not open any threads
            </Header>
          </Segment>
        ) : (
          userProfile.openThreads.map((thread) => {
            return (
              <List.Item>
                <List.Icon name="pencil alternate"></List.Icon>
                <List.Content>
                  <List.Header>{thread}</List.Header>
                </List.Content>
              </List.Item>
            );
          })
        )}
      </List>
    </Grid.Column>
  );
  // -------------------- CONDITIONAL COMPONENTS --------------------------------------------------

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {loading ? (
        <></>
      ) : (
        <Segment style={{ paddingTop: "25px" }} vertical>
          <Grid columns={1} divided padded style={{ height: "60vh" }}>
            <Container>
              {/* Introducting the user and their profile page */}
              <Segment
                inverted
                color="teal"
                compact
                style={{ margin: "15px auto" }}
              >
                <Header as="h1">
                  <strong>{userProfile.username}'s Personal Page</strong>
                </Header>
              </Segment>

              {/* Grid system dividing user personal info from user activity info */}
              <Grid
                columns="2"
                divided
                style={{
                  backgroundColor: "#8cbcbc",
                  margin: "20px",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {/* Icon/User Information Column */}
                <Grid.Column width={4}>
                  {/* Icon Row */}
                  <Grid.Row style={{ padding: "2em 1em" }}>
                    {/* default image */}
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="medium"
                      circular
                    />
                  </Grid.Row>

                  {/* User Information Row */}
                  <Grid.Row>
                    <Card>
                      <Card.Content>
                        {/* Header Titile */}
                        <Card.Header
                          content="User Information"
                          style={{ fontSize: "1em", padding: "1em 0em" }}
                        />
                        {/* Username */}
                        <Card.Description content="Username" />
                        <Label
                          size="big"
                          color="teal"
                          style={{ margin: "10px" }}
                        >
                          {userProfile.username}
                        </Label>
                        {/* Full Name */}
                        <Card.Description content="Name" />
                        <Label
                          size="big"
                          color="teal"
                          style={{ margin: "10px" }}
                        >{`${userProfile.firstName} ${userProfile.lastName}`}</Label>
                        {/* Email */}
                        <Card.Description content="Email" />
                        <Label
                          size="big"
                          color="teal"
                          style={{ margin: "10px" }}
                        >
                          {userProfile.email}
                        </Label>

                        {/* <Card.Header
                        content="Change Password"
                        style={{ fontSize: "1em", padding: "1em 0em" }}
                      />
                      <Card.Description content="Enter Current Password" />
                      <Input
                        placeholder="Current Password"
                        style={{ padding: "1em 0em" }}
                      />
                      <Card.Description content="Enter New Password" />
                      <Input
                        placeholder="New Password"
                        style={{ padding: "1em 0em" }}
                      />
                      <Card.Description content="Re-enter New Password" />
                      <Input
                        placeholder="Re-enter New Password"
                        style={{ padding: "1em 0em" }}
                      />
                      <Button color="teal">Submit</Button> */}
                      </Card.Content>
                    </Card>
                  </Grid.Row>
                </Grid.Column>

                {/* Profile Information Column */}
                <Grid.Column width={12}>
                  {/* Achievements section */}
                  <Header as="h3" style={{ fontSize: "1.5em" }}>
                    Achievements
                  </Header>
                  <Segment raised>
                    <Image.Group style={{ textAlign: "center" }}>
                      {/* If a user contributed 1 resource: Newcomer Badge */}
                      {userProfile.contributedResources.length >= 1 ? (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge1.png")}
                              size="tiny"
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Newcomer Badge: You've contributed 1 resource!"
                          inverted
                        />
                      ) : (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge1.png")}
                              size="tiny"
                              disabled
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Newcomer Badge: Contribute 1 resource to unlock this badge!"
                          inverted
                        />
                      )}
                      {/* If a user contributes 5 resource: Not a Bystander Badge */}
                      {userProfile.contributedResources.length >= 5 ? (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge2.png")}
                              size="tiny"
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Not A Bystander Badge: You've contributed 5 resources!"
                          inverted
                        />
                      ) : (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge2.png")}
                              size="tiny"
                              disabled
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Not A Bystander Badge: Contribute 5 resources to unlock this badge!"
                          inverted
                        />
                      )}
                      {/* If a user opened a thread: Leader Not a Follower Badge */}
                      {userProfile.openThreads.length >= 1 ? (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge3.png")}
                              size="tiny"
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Leader Not A Follower Badge: You've opened a thread!"
                          inverted
                        />
                      ) : (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge3.png")}
                              size="tiny"
                              disabled
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Leader Not A Follower Badge: Open a thread to unlock this badge!"
                          inverted
                        />
                      )}
                      {/* If a user contirbutes 50 resources: Real MVP Badge */}
                      {userProfile.contributedResources.length >= 50 ? (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge4.png")}
                              size="tiny"
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Real MVP Badge: You've contributed 50 resources!"
                          inverted
                        />
                      ) : (
                        <Popup
                          trigger={
                            <Image
                              src={require("../../assets/badge4.png")}
                              size="tiny"
                              disabled
                              style={{ margin: "20px" }}
                            />
                          }
                          content="Real MVP Badge: Contribute 50 resources to unlock this badge!"
                          inverted
                        />
                      )}
                    </Image.Group>
                  </Segment>

                  {/* Description section */}
                  <Header as="h3" style={{ fontSize: "1.5em" }}>
                    Description
                  </Header>
                  <Segment textAlign="center" style={{ margin: "15px auto" }}>
                    {userProfile.briefDescription}
                  </Segment>
                  {/* Favorite repository section */}
                  <Header as="h3" style={{ fontSize: "1.5em" }}>
                    Favorite Resources
                  </Header>
                  <Segment raised>
                    <Card.Group>
                      {likedResources.map((resource) => {
                        {
                          /* Use the ProfileLikedResources component to format liked resources */
                        }
                        return (
                          <ProfileLikedResources
                            removeResourceFromProfile={
                              removeResourceFromProfile
                            }
                            resource={resource}
                          />
                        );
                      })}
                    </Card.Group>
                  </Segment>

                  {/* Contributed Resources and Open Threads section */}
                  <Header as="h3" style={{ fontSize: "1.5em" }}>
                    Your Contributions
                  </Header>
                  <Segment>
                    <Grid columns={2} relaxed="very">
                      {/* Resources Column */}
                      {contributedResourcesColumn}

                      {/* Threads column */}
                      {contributedThreadsColumn}
                    </Grid>
                    <Divider vertical>And</Divider>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Container>
          </Grid>
        </Segment>
      )}
    </React.Fragment>
  );
}

ProfilePage.propTypes = {
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

export default connect(mapStateToProps)(ProfilePage);
