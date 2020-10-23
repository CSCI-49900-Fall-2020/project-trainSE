import React from "react";
import { List, Header, Segment } from "semantic-ui-react";

const ThreadList = (props) => {
  const fakeData = [1, 2, 3, 4, 5, 6, 7];
  // creates the list items
  // might need filter function to get all elements in an specific level
  const itemList = fakeData.map((item) => (
    <List.Item key={item} as="a" href="#fake_thread">
      Resource title
    </List.Item>
  ));
  const level = props.level.toUpperCase();
  return (
    <Segment padded style={{ marginBottom: "2%" }}>
      <Header as="h3" color="teal">
        {level}
      </Header>

      <List link relaxed>
        {itemList}
      </List>
    </Segment>
  );
};
export default ThreadList;
