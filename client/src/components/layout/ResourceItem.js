import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";

// The ResourceItem component as a functional component
const ResourceItem = () => {
  // Auxiliary data to help with routing
  let { url } = useRouteMatch();
  console.log(url);

  // The actual HTML/JSX to return after a component is mounted
  return (
    <Card raised>
      <Card.Content textAlign={"left"}>
        {/* <Label as="a" color="red" ribbon>
        Overview
      </Label> */}
        <Card.Header color="black">Resource Title</Card.Header>
        <Card.Meta>
          Posted by <strong>TrainSE</strong> 20 min ago
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
          <Icon name="comments" /> 23
        </Label>
        <Link to={`${url}/resource`}>
          <Label color="teal">
            <Icon name="mouse pointer" /> View
          </Label>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default ResourceItem;
