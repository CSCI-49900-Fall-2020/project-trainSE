import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
  FeedUser,
} from "semantic-ui-react";
import SideContainer from "../layout/SideContainer";
import CommentList from "../layout/CommentList";
import CommentForm from "../layout/CommentForm";
import { set } from "mongoose";
// The ResourcePage component as a functional component
const ResourcePage = ({ auth: { user } })  => {
  /* IMPORTANT EDIT: this component would've been given a prop.
        This page would dynamically update based on the resource and the
        thread it belonged to.
        Still have to make API calls and backend routes
    */

  const [resource, setResource] = useState({});
  // const [isNewCommentAdded, setIsNewCommentAdded] = useState(false);

  // Auxiliary helper data about routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let repository = routing_params[3];
  let thread = routing_params[5];
  let id = routing_params[7];
  console.log(id);

  // const handleNewComment= () => {
  //   setIsNewCommentAdded(true);
  // }
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
//   console.log("resource: ", resource);

  
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
                  {resource.comments ? resource.comments.length: "loading..." }

                </Label>
                {/* <Segment basic>
                  <Icon link name="comments" color="teal" /> 23
                </Segment>
                <Segment basic>
                  <Icon link name="comments" color="teal" /> 23
                </Segment> */}
                <Label style={{ backgroundColor: "white" }} size="large">
                  <Icon link name="like" color="teal" />
                  {resource.likes ? resource.likes: "loading..." }
             
                </Label>
                {/* <Segment basic> */}
                {/* <Rating defaultRating={4} maxRating={5} disabled /> */}
                {/* </Segment> */}
              </Container>
              
              {/* comment section */}
              <Comment.Group>
               <Header as="h3" dividing>
                  Comments
              </Header>
              {/* {listOfComments} */}
               <CommentList comments={resource.comments} />
               {/* <CommentList/> */}
               <CommentForm userName={user.username} />
              {/* <CommentForm userName={user.username} onHandleNewComment ={handleNewComment}/> */}
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
// export default ResourcePage;
