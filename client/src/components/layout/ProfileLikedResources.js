import React, { useState, useEffect } from "react";
import { Card, Label, Icon, Button } from "semantic-ui-react";
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
      <Card>
        <Card.Content>
          <Card.Header>
            {props.resource.resourceTitle}
            {"  "}
            <Label color={determineColor(props.resource.difficultyLevel)}>
              {props.resource.difficultyLevel}
            </Label>
            {props.resource.resourceType === "Video" ? (
              <Icon color="red" name="youtube" />
            ) : (
              <Icon color="blue" name="file alternate" />
            )}
          </Card.Header>
          <Button
            target="_blank"
            icon
            labelPosition="right"
            href={props.resource.resourceLink}
            style={{ margin: "10px 0px 10px 0px" }}
            color="blue"
            size="mini"
          >
            Website
            <Icon name="world" />
          </Button>{" "}
          <Button
            color="red"
            icon
            style={{ marginLeft: "5px" }}
            onClick={() => props.removeResourceFromProfile(props.resource._id)}
          >
            <Icon name="trash" />
          </Button>
        </Card.Content>
        <Card.Content extra>
          <Label color="teal">{props.resource.disciplineTitle}</Label>
          <Label color="teal">{props.resource.repository}</Label>
          <Label color="teal">{props.resource.threadTitle}</Label>
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
