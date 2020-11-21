import React from "react";
import { Comment, Icon } from "semantic-ui-react";

// The CommentForm component as a functional component
const CommentList = (props) => {
  const commentArr = props.comments;

  // Render loading
  let listOfComments = "Loading...";

  // Or render an array If there exists a commentArr
  if (commentArr) {
    listOfComments = commentArr.map(({ author, text, timeStamp }, index) => (
      <Comment key={index}>
        <Comment.Avatar
          src={<Icon name="user circle" size="big" color="teal" />}
        />
        <Comment.Content>
          <Comment.Author as="a">{author}</Comment.Author>
          <Comment.Metadata>
            <div>{timeStamp}</div>
          </Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>
        </Comment.Content>
      </Comment>
    ));
  }

  // The actual HTML/JSX to return after a component is mounted
  // listOfComments will either be "Loading..." or the commentArr
  return <div>{listOfComments}</div>;
};
export default CommentList;
