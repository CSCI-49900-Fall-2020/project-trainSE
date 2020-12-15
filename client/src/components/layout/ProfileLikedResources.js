import React, { useState, useEffect } from "react";
import { Card, Label, Icon, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ProfileLikedResources(props) {
  // Helper function to conditionally render difficulty colors
  let determineColor = (difficulty) => {
    if (difficulty === "Beginner") return "green";
    else if (difficulty === "Intermediate") return "yellow";
    else if (difficulty === "Advanced") return "red";
    else return "grey";
  };
  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Label
              color={determineColor(props.resource.difficultyLevel)}
              ribbon
            >
              {props.resource.difficultyLevel}
            </Label>
            {props.resource.resourceTitle}
          </Card.Header>
          <Button
            target="_blank"
            icon
            labelPosition="right"
            href={props.resource.resourceLink}
            style={{ margin: "10px 0px 3px 0px" }}
            color="blue"
            size="mini"
          >
            Website
            <Icon name="world" />
          </Button>
        </Card.Content>

        <Card.Content extra style={{ marginBottom: "0" }}>
          <Grid columns={2} style={{ paddingBottom: "0" }}>
            <Grid.Row>
              <Grid.Column width={15}>
                <Label color="teal">{props.resource.disciplineTitle}</Label>
                <Label color="teal">{props.resource.repository}</Label>
                <Label color="teal">{props.resource.threadTitle}</Label>
                {/* <Label color={determineColor(props.resource.difficultyLevel)}>
                  {props.resource.difficultyLevel}
                </Label> */}
                {props.resource.resourceType === "Video" ? (
                  <Label color="red">
                    <Icon name="youtube" /> Video
                  </Label>
                ) : (
                  <Label color="blue">
                    <Icon name="file alternate" /> Article
                  </Label>
                )}
              </Grid.Column>
              <Grid.Column width={1}>
                <Button
                  icon
                  style={{ backgroundColor: "white", padding: "0" }}
                  onClick={() =>
                    props.removeResourceFromProfile(props.resource._id)
                  }
                >
                  <Icon name="trash" color="red" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </>
  );
}

ProfileLikedResources.propTypes = {
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

export default connect(mapStateToProps)(ProfileLikedResources);
