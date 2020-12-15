import React from "react";
import { Card, Label, Icon, Grid } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";

// The ResourceItem component as a functional component
const ResourceItem = (props) => {
  // Auxiliary data to help with routing
  let { url } = useRouteMatch();
  console.log("Resource Item: ", props);
  console.log("Resource Item: ", url);
  //
  //

  //

  // The actual HTML/JSX to return after a component is mounted
  return (
    <Card raised color="teal">
      <Card.Content textAlign={"left"}>
        <Card.Header color="black">{props.resource.resourceTitle}</Card.Header>
        <Card.Meta>
          {/* Posted by <strong>TrainSE</strong> 20 min ago */}
          Posted by <strong>Open REsource</strong>
        </Card.Meta>
        <Card.Meta style={{ padding: "1% 0 0 0" }}>
        {/* Resource type Label*/}
          {props.resource.resourceType === "Video" ? (
            <Label color="red" size="tiny">
              <Icon name="youtube" /> Video
            </Label>
          ) : (
            <Label color="blue" size="tiny">
              <Icon name="file alternate" /> Article
            </Label>
          )}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Label color="teal">
                <Icon name="like" color="red" /> {props.resource.likes}
              </Label>
              <Label color="teal">
                <Icon name="comments" /> {props.resource.comments.length}
              </Label>
            </Grid.Column>
            <Grid.Column>
              <Link to={`${url}/resource/${props.resource._id}`}>
                <Label color="teal" style={{ marginLeft: "50%" }}>
                  <Icon name="mouse pointer" /> View
                </Label>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default ResourceItem;
