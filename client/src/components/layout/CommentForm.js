import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useRouteMatch } from "react-router-dom";
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
// The CommentForm component as a functional component
const CommentForm = (props) => {
  // Auxiliary helper data about routing
  let { url } = useRouteMatch();
  let routing_params = url.split("/");
  let discipline = routing_params[2];
  let id = routing_params[7];

  // State to manage a single comment
  const [comment, setComment] = useState({
    author: props.userName,
    text: "",
  });

  // Everytime a change is detected with user input
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

  // When a user submits their form data, this function runs
  const handleSubmit = (event) => {
    event.preventDefault(); // This prevents the default behavior of a page re-load

    // console.log(comment);
    // Stringify the resource object into JSON for it to be transmitted to the backend
    const body = JSON.stringify(comment);
    // console.log("Stringify the comment object: ", body);

    // Nest the axios call in an async function
    async function submitComment() {
      // Make a POST request
      const res = await Axios.post(
        `/api/upload/resource/comment/${discipline}/${id}`,
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      // Console log the data recieved from the backend
      // console.log("Data received from the backend: ", res);

      // Important explanation for Olenka
      /* setComments was a state method from ResourcePage.js. We passed setComments down to
      CommentForm.js as a prop, so we access setComment through the props object. So, if the
      POST request was succesful, that means we submitted a comment on the backend, but did not
      reflect that change on the frontend. Thus, using the JS array spread operator, we must update setComments to
      be all the comments we had before plus the new comment we just submitted to the backend. That
      means the state of comments will be updated (even if comments is in the ResourcePage.js file). This
      will then lead to CommentList.js to dynamicaly update its UI with the new comment attached at the
      end of the list.
      The confusing part is that comments and setComments are in three different files, so it's
      difficult to understand how they're communicating. But, just know that because we passed down the
      setComments as a prop to this file, using setComments will relfect changes in other files who 
      rely on the state of comments. */
      props.setComments([...props.comments, res.data.response]);
    }

    // Call the async function
    submitComment();
    // Resets the textarea back to blank
    event.target.reset();
  };

  // The actual HTML/JSX to return after a component is mounted
  return (
    <Form reply onSubmit={handleSubmit}>
      {/* <Form.TextArea name="text" required onChange={(e) => onChange(e)} value={comment.text} /> */}
      {/* Text area for the comment section */}
      <Form.TextArea name="text" required onChange={(e) => onChange(e)} />
      {/* Button when submitting a comment */}
      <Button
        content="Add Comment"
        labelPosition="left"
        icon="edit"
        primary
        type="submit"
      />
    </Form>
  );
};

export default CommentForm;
