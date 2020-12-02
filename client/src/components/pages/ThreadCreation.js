import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Step,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CreateThread = ({ auth: { user } }) => {
  const [thread, setThread] = useState({
    threadTitle: "",
    repository: "",
    discipline: "",
    difficultyLevel: "",
    submittedBy: user.username,
  });
  const [redirect, setRedirect] = useState(false);

  // Everytime a change is detected with user input
  const onChange = (e) =>
    setThread({ ...thread, [e.target.name]: e.target.value });
 
  // When a user submits their form data, this function runs
  const onSubmit = async (e) => {
    e.preventDefault(); // This prevents the default behavior of a page re-load

    // Stringify the thread object into JSON for it to be transmitted to the backend
    console.log("Data to be sent to the backend: ", thread);
    const body = JSON.stringify(thread);
    console.log("Stringify the resource oject: ", body);

    // Make an asynchronous axios call to the backend
    async function submitThread() {
      // Make a POST request
      const res = await Axios.post("/api/upload/thread", body, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      //   Console log the data recieved from the backend
      console.log("Data received from the backend: ", res);

      //   If the response back was 200 okay
      if (res.status == 200) {
        // Redirect the user to the dashboard
        // Set the state to redirecting
        setRedirect(true);
      }
    }
    // Make the backend call
    submitThread();
  };

  // If the redirect state is true
  if (redirect) {
    // Redirect the user to the dashboard
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      {/* Initial Headers */}
      <Segment compact style={{ margin: "20px auto" }}>
        <Header as="h1" color="teal" textAlign="center">
          <Icon name="pencil" />
          Open a new thread
        </Header>
      </Segment>
      {/* Steps to highlight the rules of form submission */}
      <Segment compact inverted color="teal" style={{ margin: "15px auto" }}>
        <Step.Group>
          {/* Prepping the Thread */}
          <Step>
            <Icon name="pencil" />
            <Step.Content>
              <Step.Title>Thread</Step.Title>
              <Step.Description>Provide a valid Thread name</Step.Description>
            </Step.Content>
          </Step>
          {/* Advise of case sensitive rules */}
          <Step>
            <Icon name="clipboard check" />
            <Step.Content>
              <Step.Title>Validation</Step.Title>
              <Step.Description>Uppercased, Spaced Data</Step.Description>
            </Step.Content>
          </Step>
          {/* Enter data */}
          <Step>
            <Icon name="keyboard" />
            <Step.Content>
              <Step.Title>Enter</Step.Title>
              <Step.Description>Enter data accordingly</Step.Description>
            </Step.Content>
          </Step>
          {/* Submit */}
          <Step>
            <Icon name="check" />
            <Step.Content>
              <Step.Title>Submit</Step.Title>
              <Step.Description>Thank you for contributing!</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </Segment>

      {/* Grid containing the form */}
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 700 }}>
          {/* The form */}
          <Form size="large" onSubmit={(e) => onSubmit(e)}>
            <Segment stacked>
              <Form.Input
                required
                fluid
                icon="edit"
                iconPosition="left"
                name="threadTitle"
                label="Thread Title"
                labelPosition="left"
                placeholder="Thread Title"
                onChange={(e) => onChange(e)}
              />

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  name="discipline"
                  label="Which Discipline It Belongs To?"
                  placeholder="Discipline"
                  onChange={(e) => onChange(e)}
                />
                <Form.Input
                  required
                  fluid
                  name="repository"
                  label="Which Repository It Belongs To?"
                  placeholder="Repository"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Input
                required
                fluid
                name="difficultyLevel"
                label="Difficulty Level"
                placeholder="Level"
                onChange={(e) => onChange(e)}
              />

              <Button type="submit" color="teal" fluid size="large">
                Add Thread
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

CreateThread.propTypes = {
  //   getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  // Our root reducer in reducer/index.js uses auth
  // We map the auth global state to a prop called auth
  // Now, we can use auth in this component
  auth: state.auth,
});

export default connect(mapStateToProps)(CreateThread);
