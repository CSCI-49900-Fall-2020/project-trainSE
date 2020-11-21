import React from "react";
import { Button } from "semantic-ui-react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <h1> Open REsource</h1>
      <p>
        An open source hub of tech-related material, approved by YOU and the
        tech community
      </p>
      <div className="hero-btns">
        <Button size="massive" basic inverted color="grey" href="/register">
          {" "}
          Sign up{" "}
        </Button>
        <Button size="massive" basic inverted color="grey" href="/login">
          {" "}
          Log in{" "}
        </Button>
      </div>
    </div>
  );
}
