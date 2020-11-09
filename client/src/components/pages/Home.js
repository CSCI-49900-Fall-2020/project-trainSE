import React from "react";
import '../../App.js';
import HeroSection from '../layout/HeroSection';
import { Segment, Button, Header, Image, Grid } from 'semantic-ui-react';
import Footer from '../layout/Footer'
import './Home.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' color='teal' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
            </p>
            <Header as='h3' color='teal' style={{ fontSize: '2em' }}>
              We Make Bananas That Can Dance
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src="https://image.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

      <Footer />
    </>
  );
}
