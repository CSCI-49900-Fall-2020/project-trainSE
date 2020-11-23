import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";

// The ResourceItem component as a functional component
const ResourceItem = (props) => {
  // Auxiliary data to help with routing
  let { url } = useRouteMatch();
  console.log("Resource Item: ", props);
  console.log("Resource Item: ", url);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <Card raised color="teal">
      <Card.Content textAlign={"left"}>
        {/* <Label as="a" color="red" ribbon>
        Overview
      </Label> */}
        <Card.Header color="black">{props.resource.resourceTitle}</Card.Header>
        <Card.Meta>
          {/* Posted by <strong>TrainSE</strong> 20 min ago */}
          Posted by <strong>TrainSE</strong> 
        </Card.Meta>
        <Card.Meta style={{padding:"1%"}}>
        <Icon disable name="tags" />
        {props.resource.linkType === "Video"?  <Icon color="red" name="youtube" /> : <Icon color="blue" name="file alternate" /> }
       
        </Card.Meta>
        
        {/* <Card.Description>
        Nullam quis risus eget urna mollis ornare vel eu leo.
      </Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        <Label color="teal">
          <Icon name="like" /> 23
        </Label>
        <Label color="teal">
          <Icon name="comments" /> {props.resource.comments.length}
        </Label>
        <Link to={`${url}/resource/${props.resource._id}`}>
          <Label color="teal">
            <Icon name="mouse pointer" /> View
          </Label>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default ResourceItem;
