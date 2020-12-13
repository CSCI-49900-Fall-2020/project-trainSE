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
  Dropdown,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function CreateResource({ auth: { user } }) {
  // -------------------- STATIC DATA --------------------------------------------------
  const disciplineOptions = [
    {
      key: "languages",
      text: "Languages",
      value: "Languages",
    },
    {
      key: "mathematics",
      text: "Mathematics",
      value: "Mathematics",
    },
    {
      key: "databases",
      text: "Databases",
      value: "Databases",
    },
    {
      key: "architecture",
      text: "Architecture",
      value: "Architecture",
    },
    {
      key: "algorithms-and-data-structures",
      text: "Algorithms and Data Structures",
      value: "Algorithms and Data Structures",
    },
    {
      key: "artificial-intelligence",
      text: "Artificial Intelligence",
      value: "Artificial Intelligence",
    },
  ];

  const resourceTypeOptions = [
    {
      key: "video",
      text: "Video",
      value: "Video",
    },
    {
      key: "article",
      text: "Article",
      value: "Article",
    },
  ];
  // -------------------- STATIC DATA --------------------------------------------------

  // -------------------- LOCAL REACT STATE --------------------------------------------------
  // From the auth global state, extract the user property
  const [resource, setResource] = useState({
    resourceTitle: "",
    resourceLink: "",
    disciplineTitle: "",
    repository: "",
    threadTitle: "",
    difficultyLevel: "",
    resourceType: "",
    submittedBy: user.username,
  });

  const [redirect, setRedirect] = useState(false);

  const [dropdownWorks, setDropdownWorks] = useState({});

  const [repoOptions, setRepoOptions] = useState([{}]);

  const [beginnerThreadOptions, setBeginnerThreadOptions] = useState([{}]);
  const [intermediateThreadOptions, setIntermediateThreadOptions] = useState([
    {},
  ]);
  const [advancedThreadOptions, setAdvancedThreadOptions] = useState([{}]);
  // -------------------- LOCAL REACT STATE --------------------------------------------------

  // -------------------- API CALLS FOR DROPDOWN AUTO-POPULATION --------------------------------------------------
  // When clicking a domain, retrieve the repos of that domain and populate the dropdown
  const retrieveRepos = async (e, result) => {
    // When clicking on a domain/discipline
    // We can either click on it the first time or change our choice
    // When changing the choice, we have to set the repo and threads back to empty
    setResource({
      ...resource,
      repository: "",
      threadTitle: "",
      difficultyLevel: "",
    });
    setRepoOptions([{}]);
    setBeginnerThreadOptions([{}]);
    setIntermediateThreadOptions([{}]);
    setAdvancedThreadOptions([{}]);

    // Testing out a dropdown event (rather than an input onChange event)
    console.log("This is the triggered event: ", e);
    console.log("This is the actual values: ", result);
    const { name, value } = result || e.target;

    // Make async outer function to make inner await request
    // This function retireves the repo based on the current chosen domain
    async function getReposforDiscipline() {
      // Make a GET request while sending the domain name (aka value) along
      const res = await Axios.get(`/api/domain/fetchDropdownRepos/${value}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      console.log(res);
      // Update the state  of the repos (it should reflect in the repo dropdown)
      setRepoOptions(res.data.repos);
    }

    getReposforDiscipline();

    // setDropdownWorks({ ...dropdownWorks, [name]: value });
    // Update the state of the resource
    // Name is most likely disciplineTitle and value is one of the domains
    setResource({ ...resource, [name]: value });
  };

  // -------------------------------------------------------------------------------------
  // When clicking a repo, retrieve the threads of that repo and populate the dropdown
  const retrieveThreads = async (e, result) => {
    console.log("This is the triggered event: ", e);
    console.log("This is the actual values: ", result);
    const { name, value } = result || e.target;

    async function getThreadsForRepo() {
      // Make a GET request while sending the repo name (aka value) along
      const res = await Axios.get(`/api/domain/fetchDropdownThreads/${value}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      setBeginnerThreadOptions(res.data.beginnerOptions);
      setIntermediateThreadOptions(res.data.intermediateOptions);
      setAdvancedThreadOptions(res.data.advancedOptions);
      console.log(res.data);
    }
    getThreadsForRepo();

    setResource({ ...resource, [name]: value });
  };
  // -------------------- API CALLS FOR DROPDOWN AUTO-POPULATION --------------------------------------------------

  // -------------------- MISCELLANEOUS -------------------------------------
  // After setting the thread, we must set the difficulty
  const determineRestOfForm = async (e, result) => {
    console.log("This is the triggered event: ", e);
    console.log("This is the actual values: ", result);
    const { name, value, customProp } = result || e.target;
    setResource({ ...resource, [name]: value, difficultyLevel: customProp });
  };
  // -------------------- MISCELLANEOUS -------------------------------------

  // -------------------- MANAGING USER INPUT STATE --------------------------------------------------
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
    setResource({ ...resource, [e.target.name]: e.target.value });

  // If a choice is made from the dropdown
  const onChangeDropdown = (e, result) => {
    console.log("This is the triggered event: ", e);
    console.log("This is the actual values: ", result);
    const { name, value } = result || e.target;
    console.log(name, value);
    // Update the state of the resource based on the user's choice
    setResource({ ...resource, [name]: value });
  };
  // -------------------- MANAGING USER INPUT STATE --------------------------------------------------

  // -------------------- FINAL FORM SUBMISSION --------------------------------------------------
  // When a user submits their form data, this function runs
  const onSubmit = async (e) => {
    e.preventDefault(); // This prevents the default behavior of a page re-load

    // Stringify the resource object into JSON for it to be transmitted to the backend
    console.log("Data to be sent to the backend: ", resource);
    const body = JSON.stringify(resource);
    console.log("Stringify the resource oject: ", body);

    // Make an asynchronous axios call to the backend
    async function submitResource() {
      // Make a POST request
      const res = await Axios.post("/api/upload/resource", body, {
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
    submitResource();
  };
  // -------------------- FINAL FORM SUBMISSION --------------------------------------------------

  // If the redirect state is true
  if (redirect) {
    // Redirect the user to the dashboard
    return <Redirect to="/dashboard" />;
  }

  // The actual HTML/JSX to return after a component is mounted
  return (
    <>
      {/* Initial Headers */}
      <Segment compact style={{ margin: "20px auto" }}>
        <Header as="h1" color="teal" textAlign="center">
          <Icon name="upload" /> Contribute a Resource
        </Header>
        {/* <p>{JSON.stringify(resource)}</p> */}
      </Segment>

      {/* Steps to highlight the rules of form submission */}
      <Segment compact inverted color="teal" style={{ margin: "15px auto" }}>
        <Step.Group>
          {/* Prepping the resource */}
          <Step>
            <Icon name="linkify" />
            <Step.Content>
              <Step.Title>Resource</Step.Title>
              <Step.Description>Provide a working URL</Step.Description>
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
        <Grid.Column style={{ maxWidth: 650 }}>
          {/* The form */}
          <Form size="large" onSubmit={(e) => onSubmit(e)}>
            <Segment stacked>
              {/* Resource title */}
              <Form.Input
                fluid
                icon="edit"
                iconPosition="left"
                name="resourceTitle"
                label="Resource Title"
                labelPosition="left"
                placeholder="Resource Title"
                onChange={(e) => onChange(e)}
              />

              {/* Form group dealing with link and article type */}
              <Form.Group>
                <Form.Input
                  fluid
                  icon="linkify"
                  iconPosition="left"
                  name="resourceLink"
                  label="Link to Resource"
                  placeholder="URL"
                  onChange={(e) => onChange(e)}
                  // type="password"
                  width={12}
                />
                <Form.Dropdown
                  fluid
                  options={resourceTypeOptions}
                  search
                  selection
                  name="resourceType"
                  label="Type Of Resource"
                  placeholder="Type"
                  onChange={onChangeDropdown}
                  width={4}
                />
              </Form.Group>
              {/* Link to resource */}

              {/* Form group dealing with the discipline, repository */}
              <Form.Group widths="equal">
                {/* Testing */}
                <Form.Dropdown
                  fluid
                  placeholder="Discipline"
                  search
                  selection
                  clearable
                  name="disciplineTitle"
                  label="Which Discipline It Belongs To?"
                  options={disciplineOptions}
                  onChange={retrieveRepos}
                />
                {/* Testing */}
                {/* <Form.Input
                  fluid
                  //   options={disciplines}
                  name="disciplineTitle"
                  label="Which Discipline It Belongs To?"
                  placeholder="Discipline"
                  onChange={(e) => onChange(e)}
                /> */}
                {/* Testing */}
                <Form.Dropdown
                  fluid
                  placeholder="Repository"
                  search
                  selection
                  clearable
                  name="repository"
                  label="Which Repository It Belongs To?"
                  options={repoOptions}
                  onChange={retrieveThreads}
                />
                {/* Testing */}
                {/* <Form.Input
                  fluid
                    options={repositories}
                  name="repository"
                  label="Which Repository It Belongs To?"
                  placeholder="Repository"
                  onChange={(e) => onChange(e)}
                /> */}
              </Form.Group>

              {/* Form group dealing with the threads of all difficulty levels */}
              <Form.Group widths="equal">
                {/* Beginner threads */}
                <Form.Dropdown
                  fluid
                  placeholder="Beginner Threads"
                  search
                  selection
                  clearable
                  name="threadTitle"
                  label="Is it Beginner?"
                  options={beginnerThreadOptions}
                  onChange={determineRestOfForm}
                  customProp="Beginner"
                />

                {/* Intermediate threads */}
                <Form.Dropdown
                  fluid
                  placeholder="Intermediate Threads"
                  search
                  selection
                  clearable
                  name="threadTitle"
                  label="Is it Intermediate?"
                  options={intermediateThreadOptions}
                  onChange={determineRestOfForm}
                  customProp="Intermediate"
                />

                {/* Advanced threads */}
                <Form.Dropdown
                  fluid
                  placeholder="Advanced Threads"
                  search
                  selection
                  clearable
                  name="threadTitle"
                  label="Is it Advanced?"
                  options={advancedThreadOptions}
                  onChange={determineRestOfForm}
                  customProp="Advanced"
                />

                {/* <Form.Input
                  fluid
                  //   options={threads}
                  name="threadTitle"
                  label="Which Thread It Belongs To?"
                  placeholder="Thread"
                  onChange={(e) => onChange(e)}
                /> */}
              </Form.Group>

              {/* Form group dealing with difficulty level and resource type*/}
              {/* <Form.Group widths="equal">
                <Form.TextArea
                  fluid
                  name="description"
                  label="Brief Desciption"
                  placeholder="What makes this resource unique, insightful, noteworthy, etc.?"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group> */}

              <Button type="submit" color="teal" fluid size="large">
                Submit Your Resource
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}

CreateResource.propTypes = {
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

export default connect(mapStateToProps)(CreateResource);
