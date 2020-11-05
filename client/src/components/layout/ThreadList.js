import React from "react";
import { List, Header, Segment } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";

// The ThreadList component as a functional component
const ThreadList = (props) => {
  const fakeData = [1, 2, 3, 4, 5, 6, 7];
  // let { url } = useRouteMatch();
  // console.log(url);

  // creates the placebo list items
  // might need filter function to get all elements in an specific level
  const itemList = props.threads.map((thread, index) => (
    <List.Item key={index} as="a" color="black">
      <Link to={`${url}/thread/functions`}>{thread.thread}</Link>
    </List.Item>
  ));
  const level = props.level.toUpperCase();

  // The actual HTML/JSX to return after a component is mounted
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
