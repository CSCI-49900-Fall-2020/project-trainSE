import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import {
  Divider,
  Container,
  Header,
  Segment,
  Label,
  Icon,
  Comment,
  Button,
  Popup
} from "semantic-ui-react";
import CommentList from "../layout/CommentList";
import CommentForm from "../layout/CommentForm";

// The ResourcePage component as a functional component
const ResourcePage = ({ auth: { user } }) => {
  const [resource, setResource] = useState({}); // State to manage an entire resource
  const [comments, setComments] = useState([{}]); // State to manage the comments of a resource

  const [likeAmount, setLikes] = useState(0); //state to manage the likes of a resource

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];
  let id = routing_params[7];
  //   console.log(id);

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
      setLikes(res.data.resource.likes);
    }

    // Call the asynchronous function
    fetchResource();
  }, []);

  const increaseLikes = (username) => {
    //current_user =user.username;
    //const res = await axios.get(`/api/resource/likeresource/${discipline}/${id}/${username}`);
    let liked_already;
    const addLike = async () => {
      const res = await Axios.get(
        `/api/upload/resource/likeResource/${discipline}/${id}/${username}`
      );
      console.log(res);
      liked_already = res.data.result;
      console.log(liked_already);
      if (liked_already === false) {
        setLikes(likeAmount + 1);
      }
      else{
        setLikes(likeAmount)
      }
    };
    addLike();
    console.log(likeAmount);
  };
  const decreaseLikes = (username) => {
    //current_user =user.username;
    //const res = await axios.get(`/api/resource/likeresource/${discipline}/${id}/${username}`);
    let liked_already;
    const subtractLike = async () => {
      const res = await Axios.get(
        `/api/upload/resource/unlikeResource/${discipline}/${id}/${username}`
      );
      console.log(res);
      liked_already = res.data.result;
      console.log(liked_already);
      if (liked_already === false) {
        setLikes(likeAmount - 1);
      }
      else{
        setLikes(likeAmount)
      }
    };
    subtractLike();
    console.log(likeAmount);
  };
  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {/* main section */}
      {/* <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}> */}
      <Container>
        <Segment padded style={{ paddingTop: "4%" }}>
          {/* Resource title */}
          <Header as={"h3"}>{resource.resourceTitle}</Header>
          {/* Meta data about how long the resource was posted */}
          <Header.Subheader style={{ color: "grey" }}>
            {/* Posted by <strong>TrainSE</strong> . 20 min ago */}
            Posted by <strong>TrainSE</strong>
          </Header.Subheader>
          <Header.Subheader style={{ paddingTop: "1%" }}>
            <Icon disable name="tags" color="grey" />
            {resource.linkType === "Video" ? (
              <Icon color="red" name="youtube" />
            ) : (
              <Icon color="blue" name="file alternate" />
            )}
          </Header.Subheader>

          {/* Link to the resource */}
          <Container style={{ margin: "1%" }}>
            <Icon name="linkify" />
            <a href={resource.resourceLink}>Go to Website</a>
          </Container>
          {/* Icons indicatingg comment and like count */}
          {/* <Container style={{ margin: "2%" }}> */}
          <Container>
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
            <div>
              <Button as="div" labelPosition="right">
                <Button
                  color="red"
                  onClick={() => increaseLikes(user.username)}
                >
                  <Icon name="heart" />
                  Likes:
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  {likeAmount}
                </Label>
              </Button>
                
              <Button
                  color="gray"
                  onClick={() => decreaseLikes(user.username)}
                >
                  <Icon name="thumbs down" />
              </Button>

              <Button as="div" labelPosition="right">
                <Button basic color="blue">
                  <Icon name="comments" />
                  Comments
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  {resource.comments ? resource.comments.length : 0}
                </Label>
              </Button>
            </div>
          </Container>

          {/* The actual comment section */}
          <Comment.Group>
            {/* <Header as="h3" dividing> */}
            <Header as="h3">Comments</Header>
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
