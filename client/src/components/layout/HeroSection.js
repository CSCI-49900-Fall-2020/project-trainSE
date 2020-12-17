import React from "react";
import { Button, Image } from "semantic-ui-react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <h1> Open reSource</h1>
      <p>
        An open source hub of tech-related material, approved by YOU and the
        tech community
      </p>
      <Image
        size="small"
        src="https://clipartstation.com/wp-content/uploads/2018/09/clipart-robots-2.png"
      />
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
