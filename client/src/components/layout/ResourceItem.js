import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";

const ResourceItem = () => (
  <Card raised href="#card-example-link-card">
    <Card.Content textAlign={"left"}>
      <Card.Header>Resource Title</Card.Header>
      <Card.Meta>
        Posted by <strong>TrainSE</strong> 20 min ago
      </Card.Meta>
      {/* <Card.Description>
        Nullam quis risus eget urna mollis ornare vel eu leo.
      </Card.Description> */}
    </Card.Content>
    <Card.Content extra>
      <Label color="blue">
        <Icon name="like" /> 23
      </Label>
      <Label color="blue">
        <Icon name="comments" /> 23
      </Label>
    
    </Card.Content>
  </Card>
);

export default ResourceItem;
