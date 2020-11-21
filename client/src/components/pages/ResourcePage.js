import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import {
  Grid,
  Container,
  Header,
  Segment,
  Label,
  Icon,
  Comment,
} from "semantic-ui-react";
import SideContainer from "../layout/SideContainer";
import CommentList from "../layout/CommentList";
import CommentForm from "../layout/CommentForm";

// The ResourcePage component as a functional component
const ResourcePage = ({ auth: { user } }) => {
  const [resource, setResource] = useState({}); // State to manage an entire resource
  const [comments, setComments] = useState([{}]); // State to manage the comments of a resource

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];
  let id = routing_params[7];
  console.log(id);

  // Making side effect Axios call to retrieve a resource belonging to the discipline, repository, thread specified in the url
  useEffect(() => {
    async function fetchResource() {
      // Make an asynchronous axios call to the specified backend API route
      // Important to pass along the id of that resource
      const res = await Axios.get(
        `/api/domain/fetchOneResource/${discipline}/${repository}/${thread}/${id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      // Testing things
      // console.log("This is res.data: ", res.data);
      // console.log("This is res.data.resource: ", res.data.resource);

      // Set resource's state to res.data.resource
      setResource(res.data.resource);
      // Set comments's state to res.data.resource.comments
      setComments(res.data.resource.comments);
    }

    // Call the asynchronous function
    fetchResource();
  }, []);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
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
          <Container>
            <Segment padded>
              {/* Resource title */}
              <Header as={"h3"}>{resource.resourceTitle}</Header>
              {/* Meta data about how long the resource was posted */}
              <Header.Subheader style={{ color: "grey" }}>
                Posted by <strong>TrainSE</strong> . 20 min ago
              </Header.Subheader>
              {/* Link to the resource */}
              <Container style={{ margin: "2%" }}>
                <Icon name="linkify" />
                <a href={resource.resourceLink}>Go to Website</a>
              </Container>
              {/* Icons indicatingg comment and like count */}
              <Container style={{ margin: "2%" }}>
                {/*might need to add event listener to get the button working   */}
                {/* Comment count */}
                <Label style={{ backgroundColor: "white" }} size="large">
                  <Icon link name="comments" color="teal" />
                  {resource.comments ? resource.comments.length : 0}
                </Label>
                {/* Like count */}
                <Label style={{ backgroundColor: "white" }} size="large">
                  <Icon link name="like" color="teal" />
                  {resource.likes ? resource.likes : 0}
                </Label>
              </Container>

              {/* The actual comment section */}
              <Comment.Group>
                <Header as="h3" dividing>
                  Comments
                </Header>
                {/* Component to render all comments */}
                {/* comments state is passed to CommentList as prop */}
                <CommentList comments={comments} />
                {/* Component to submit a new comment */}
                {/* Important to pass comments and setComments as props */}
                {/* setComments will update the state of comments, which in turns updates CommentList and dynamically adds a new comment to the UI */}
                <CommentForm
                  comments={comments}
                  setComments={setComments}
                  userName={user.username}
                />
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

ResourcePage.propTypes = {
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
export default connect(mapStateToProps)(ResourcePage);
