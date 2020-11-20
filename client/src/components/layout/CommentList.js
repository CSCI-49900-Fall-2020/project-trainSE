import React, {useState} from "react";
import {Comment,Icon } from "semantic-ui-react";

const CommentList = (props) => {

  const commentArr = props.comments;
 
 var listOfComments = "Loading...";
  if( commentArr){
  listOfComments = commentArr.map(({author,text, timeStamp},index ) => (
  <Comment key={index}>
    <Comment.Avatar
        src={<Icon name="user circle" size="big" color="teal" />}
      />
      <Comment.Content>
        {/* <Comment.Author as="a">{comment.author}</Comment.Author> */}
        <Comment.Author as="a">{author}</Comment.Author>
        <Comment.Metadata>
        <div>{timeStamp}</div>
      </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text> 
        {/* <Comment.Actions>
      <Comment.Action>Reply</Comment.Action>
    </Comment.Actions> */}
      </Comment.Content>
    </Comment>
));}

  return <div>{listOfComments}</div>;
//  return <div></div>;
};
export default CommentList;