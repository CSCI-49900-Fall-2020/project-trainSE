import React, { useState } from "react";
import { Button, Comment, Form, Header, Icon } from "semantic-ui-react";
import {useRouteMatch } from "react-router-dom";
import Axios from "axios";


// helper function that returns the date and time of a comment as a string 
// function getTimeStamp() {
//   const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
//   const d = new Date();
//   const currDate = d.getDate();
//   const currMonthNum = d.getMonth();
//   const currYear = d.getFullYear();
//   const currTime = d.toLocaleString("en-US", {
//      hour: "numeric",
//      minute: "numeric",
//      hour12: true
//      });
//   const dateString = monthArr[currMonthNum] +" " +currDate +", " + currYear +" at " + currTime;
//   return dateString;
// }

/**************  comment Form component *********/
const CommentForm = (props) => {
  // helper data for routing
  let { path, url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let id = routing_params[7];
  // console.log(discipline);
  
    const [comment, setComment] = useState({
      author: props.userName,
      text:""
    });
    // const [addNewComment, setNewComment] = useState(false);
    // const handleNewComment = () => {
    //   setNewComment(true);
    // }
 
    const onChange = (e) =>
    // Take the event that triggered the change
    // ...resource is the rest of the resource object
    // [e.target.name] resolves to a property for the object
    // e.target.value resolves to a value for a property
    // The entirety resolves to a final object that is set as the new resource state
    // console.log(
    //   `[${e.target.name}]: ${
    //     e.target.value != undefined ? e.target.value : e.target.innerText
    //   }`
    // );
    setComment({ ...comment, [e.target.name]: e.target.value });
    
    const handleSubmit = (event) => {
        
      event.preventDefault();
      // setComment({...comment,timeStamp: getTimeStamp()});
      // setTime();
      console.log(comment);
      const body = JSON.stringify(comment); //converts object into a string
      console.log("Stringify the comment object: ", body);
      // axios post request 
      async function submitComment() {
        // Make a POST request
        const res = await Axios.post(`/api/upload/resource/comment/${discipline}/${id}`, body, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        //   Console log the data recieved from the backend
        console.log("Data received from the backend: ", res);
      }
      submitComment();
      event.target.reset(); //resets the textarea back to blank
      // props.onHandleNewComment();
     
    };
     // resets comment to its original state
    // setComment({author: "", text: ""});
    // console.log(comment);
    
    return (
      <Form reply onSubmit={handleSubmit}>
        {/* <Form.TextArea name="text" required onChange={(e) => onChange(e)} value={comment.text} /> */}
        <Form.TextArea name="text" required onChange={(e) => onChange(e)} />
        <Button content="Add Comment" labelPosition="left" icon="edit" primary type="submit"/>
      </Form>
    );
  };
export default CommentForm;  