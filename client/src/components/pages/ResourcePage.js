import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import {
  Container,
  Header,
  Segment,
  Icon,
  Comment,
  Button,
} from "semantic-ui-react";
import CommentList from "../layout/CommentList";
import CommentForm from "../layout/CommentForm";

// The ResourcePage component as a functional component
const ResourcePage = ({ auth: { user } }) => {
  // From the auth global state, extract the user property
  const [resource, setResource] = useState({}); // State to manage an entire resource
  const [comments, setComments] = useState([{}]); // State to manage the comments of a resource
  const [likeAmount, setLikes] = useState(0); // State to manage the likes of a resource
  const [indicateLiked, setIndicateLiked] = useState("thumbs up outline"); // State to indicate a resource is liked by a filled icon
  const [indicatedAdded, setIndicatedAdded] = useState("plus");

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];
  let id = routing_params[7];
  //   console.log(id);

  // -------------------------------------------------------------------------------------------------
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
      console.log("This is res.data: ", res.data);
      console.log("This is res.data.resource: ", res.data.resource);

      setResource(res.data.resource);
      setComments(res.data.resource.comments);
      setLikes(res.data.resource.likes);
      setIndicateLiked(
        res.data.resource.likedBy.includes(user.username)
          ? "thumbs up"
          : "thumbs up outline"
      );
    }

    // Call the asynchronous function
    fetchResource();
  }, []);
  // ----------------------------------------------------------------------------------------------------

  // When a user wants to increase the like count of a resource (under the impression) they haven't liked before
  // Update the amount of likes on the backend
  // Update the React state to reflect this state change of increased likes
  const increaseLikes = (username) => {
    // Boolean to prevent a user from spamming likes
    let liked_already;

    // Create an outer asynchronous function to thus make an inner asynchronous axios call
    const addLike = async () => {
      // Make a POST request to update the like count
      const res = await Axios.post(
        `/api/upload/resource/likeResource/${discipline}/${id}/${username}`,
        null,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      // Console log the response
      console.log(res);
      // Determine if the user already liked the resource before
      liked_already = res.data.likedBefore;
      console.log("Did the user like this resource before: ", liked_already);
      if (liked_already === false) {
        setLikes(likeAmount + 1);
        setIndicateLiked("thumbs up");
      } else {
        setLikes(likeAmount);
      }
    };
    addLike();
    // console.log(likeAmount);
  };
  // ----------------------------------------------------------------------------------------------------

  // When a user wants to decrease the like count of a resource (under the impression) they have liked before
  // Decrement the amount of likes on the backend
  // Update the React state to reflect this state change of decreased likes
  const decreaseLikes = (username) => {
    // No negative likeAmount
    if (likeAmount > 0) {
      // Boolean to prevent a user from spamming dislikes
      let disliked;
      // Create an outer asynchronous function to thus make an inner asynchronous axios call
      const subtractLike = async () => {
        // Make a POST request to update the like count
        const res = await Axios.post(
          `/api/upload/resource/unlikeResource/${discipline}/${id}/${username}`,
          null,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        console.log(res);
        disliked = res.data.ableToDislike;
        if (disliked === true) {
          setLikes(likeAmount - 1);
          setIndicateLiked("thumbs up outline");
        } else {
          setLikes(likeAmount);
        }
      };
      subtractLike();
      // console.log(likeAmount);
    }
  };
  // ----------------------------------------------------------------------------------------------------

  const addToMyRepository = (username) => {
    // Create an outer asynchronous function to thus make an inner asynchronous axios call
    const addToProfileRepo = async () => {
      // Make a POST request to add to my repo
      const res = await Axios.post(
        `/api/upload/resource/addToProfile/${discipline}/${id}/${username}`,
        null,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      if (res.status === 200) {
        setIndicatedAdded("check");
      }
    };

    addToProfileRepo();
  };
  // ----------------------------------------------------------------------------------------------------
  // The actual HTML/JSX to return after a component is mounted
  return (
    <React.Fragment>
      {/* main section */}
      {/* <Grid.Column width={9} style={{ backgroundColor: "#e2e6f0" }}> */}
      <Container style={{ paddingTop: "10px" }}>
        <Segment padded style={{ paddingTop: "20px" }}>
          {/* Resource title */}
          <Header as="h1" dividing>
            {resource.resourceTitle}{" "}
            {resource.linkType === "Video" ? (
              <Icon color="red" name="youtube" />
            ) : (
              <Icon color="blue" name="file alternate" />
            )}
          </Header>
          {/* Meta data about how long the resource was posted */}
          <Header.Subheader style={{ color: "grey" }}>
            Posted by <strong>{resource.submittedBy}</strong> on{" "}
            {resource.submittedWhen}
          </Header.Subheader>
          {/* Meta data about resource type icon */}
          <Header.Subheader style={{ paddingTop: "1%" }}></Header.Subheader>

          {/* Link to the resource */}
          <Container style={{ margin: "1%" }}>
            <Icon name="linkify" />
            <a href={resource.resourceLink} target="_blank">
              Go to Website
            </a>
          </Container>

          {/* Icons indicating like buttons and comment section */}
          <Container>
            {/* Button group dealing with likes and dislikes */}
            <Button.Group style={{ paddingRight: "10px" }}>
              {/* Thumps ub button to increase likes */}
              <Button
                color="green"
                onClick={() => increaseLikes(user.username)}
              >
                <Icon name={indicateLiked} />
                {likeAmount}
              </Button>
              {/* Or divider */}
              <Button.Or />
              {/* Thumbs down button to decrease likes */}
              <Button
                icon
                color="red"
                onClick={() => decreaseLikes(user.username)}
              >
                <Icon name="thumbs down outline" />
              </Button>
            </Button.Group>

            {/* Add to favorites button */}
            <Button
              color="teal"
              icon
              labelPosition="right"
              onClick={() => addToMyRepository(user.username)}
            >
              Add to Favorites
              <Icon name={indicatedAdded} />
            </Button>
          </Container>

          {/* The actual comment section */}
          <Comment.Group>
            {/* <Header as="h3" dividing> */}
            <Header as="h3">
              Comments ({resource.comments ? resource.comments.length : 0})
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
