import React, { useState, useEffect } from "react";
import { useParams, Redirect, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import {
  Grid,
  Container,
  Header,
  Segment,
  Label,
  Card,
  List,
  Icon,
  Form,
  Button,
  Comment,
  Rating,
} from "semantic-ui-react";
import SideContainer from "../layout/SideContainer";

// The ResourcePage component as a functional component
const ResourcePage = () => {
  /* IMPORTANT EDIT: this component would've been given a prop.
        This page would dynamically update based on the resource and the
        thread it belonged to.
        Still have to make API calls and backend routes
    */

  const [resource, setResource] = useState({});

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];
  let id = routing_params[7];
  console.log(id);

  // Making side effect Axios call to retrieve the resources belonging to the thread specified in the url
  useEffect(() => {
    async function fetchResource() {
      // Make an asynchronous axios call to the specified backend API route
      const res = await Axios.get(
        `/api/domain/fetchOneResource/${discipline}/${repository}/${thread}/${id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      console.log(res.data);
      setResource(res.data.resource);

      // Update the state accordingly
      // console.log(res.data);
      //   setDifficulty(res.data.resources[0].difficultyLevel);
      //   setThreadTitle(res.data.resources[0].threadTitle);
      //   setRepositoryTitle(res.data.resources[0].repository);
      //   setResources(res.data.resources);
    }

    // Call the asynchronous function
    fetchResource();
  }, []);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {console.log(resource)}
      <Grid columns={3} divided style={{ height: "100vh" }}>
        {/* side bar / drawer component */}
        <Grid.Column width={3} style={{ paddingLeft: "25px" }}>
          <h1>Side Bar</h1>
          <p>
            Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
          </p>
        </Grid.Column>

        {/* main section */}
        <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}>
          {/* <Container style={{ marginBottom: "3%" }}>
            <Header as={"h1"} color="grey">
              Header
            </Header>
          </Container> */}
          {/* resource info */}

          <Container>
            <Segment padded>
              {/* Resource title */}
              <Header as={"h3"}>{resource.resourceTitle}</Header>
              <Header.Subheader style={{ color: "grey" }}>
                Posted by <strong>TrainSE</strong> . 20 min ago
              </Header.Subheader>
              <Container style={{ margin: "2%" }}>
                <Icon name="linkify" />
                <a href={resource.resourceLink}>Go to Website</a>
              </Container>
              <Container style={{ margin: "2%" }}>
                {/*might need to add event listener to get the button working   */}
                <Label style={{ backgroundColor: "white" }} size="large">
                  <Icon link name="comments" color="teal" />
                  23
                </Label>
                {/* <Segment basic>
                  <Icon link name="comments" color="teal" /> 23
                </Segment>
                <Segment basic>
                  <Icon link name="comments" color="teal" /> 23
                </Segment> */}
                <Label style={{ backgroundColor: "white" }} size="large">
                  <Icon link name="like" color="teal" />
                  23
                </Label>
                {/* <Segment basic> */}
                <Rating defaultRating={4} maxRating={5} disabled />
                {/* </Segment> */}
              </Container>

              <Comment.Group>
                <Header as="h3" dividing>
                  Comments
                </Header>

                <Comment>
                  <Comment.Avatar
                    src={<Icon name="user circle" size="big" color="teal" />}
                  />
                  {/* <Comment.Avatar src="/images/avatar/small/matt.jpg" /> */}
                  <Comment.Content>
                    <Comment.Author as="a">Matt</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Comment>
                  <Comment.Avatar
                    src={<Icon name="user circle" size="big" color="teal" />}
                  />
                  {/* <Comment.Avatar>
                    <Icon name="user" />
                  </Comment.Avatar> */}
                  <Comment.Content>
                    <Comment.Author as="a">Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                      <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>
                        This has been very useful for my research. Thanks as
                        well!
                      </p>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Form reply>
                  <Form.TextArea />
                  <Button
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                    primary
                  />
                </Form>
              </Comment.Group>
            </Segment>
          </Container>
        </Grid.Column>

        {/* left section */}
        <Grid.Column width={4} style={{ paddingRight: "25px" }}>
          <SideContainer />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default ResourcePage;
