import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Icon,
} from "semantic-ui-react";

const disciplines = [
  { key: "l", text: "Languages", value: "languages" },
  { key: "m", text: "Mathematics", value: "mathematics" },
  { key: "d", text: "Databases", value: "databases" },
  { key: "ar", text: "Architecture", value: "architecture" },
  {
    key: "ad",
    text: "Algorithms and Data Structures",
    value: "algorithms and data structures",
  },
];

const repositories = [
  { key: "p", text: "Python", value: "python" },
  { key: "jc", text: "JavaScript", value: "javascript" },
  { key: "c", text: "C++", value: "c++" },
  { key: "j", text: "Java", value: "java" },
  { key: "h", text: "HTML/CSS", value: "htmlcss" },
  { key: "s", text: "Swift", value: "swift" },
];

const threads = [
  { key: "c", text: "Comprehension", value: "comprehension" },
  { key: "s", text: "Syntax", value: "syntax" },
  { key: "l", text: "Libraries", value: "libraries" },
  { key: "o", text: "Other", value: "other" },
];

const difficulty = [
  { key: "b", text: "Beginner", value: "beginner" },
  { key: "m", text: "Intermediate", value: "intermediate" },
  { key: "d", text: "Advanced", value: "advanced" },
];

const typeOfResource = [
  { key: "a", text: "Article", value: "article" },
  { key: "v", text: "Video", value: "video" },
];

const LoginForm = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 700 }}>
      <Header as="h2" color="teal" textAlign="center">
        <Icon name="upload" /> Contribute a Resource
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="edit"
            iconPosition="left"
            label="Resource Title"
            labelPosition="left"
            placeholder="Resource Title"
          />
          <Form.Input
            fluid
            icon="linkify"
            iconPosition="left"
            label="Link to Resource"
            placeholder="URL"
            // type="password"
          />

          <Form.Group widths="equal">
            <Form.Select
              fluid
              options={disciplines}
              label="Which Discipline It Belongs To?"
              placeholder="Discipline"
            />
            <Form.Select
              fluid
              options={repositories}
              label="Which Repository It Belongs To?"
              placeholder="Repository"
            />
            <Form.Select
              fluid
              options={threads}
              label="Which Thread It Belongs To?"
              placeholder="Thread"
            />
          </Form.Group>
          {/* <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Which Discipline It Belongs To?"
            placeholder="Discipline"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Which Repository It Belongs To?"
            placeholder="Repository"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Which Thread It Belongs To?"
            placeholder="Thread"
          /> */}
          <Form.Group widths="equal">
            <Form.Select
              fluid
              options={difficulty}
              label="Difficulty Level"
              placeholder="Level"
            />
            <Form.Select
              fluid
              options={typeOfResource}
              label="Type Of Resource"
              placeholder="Type"
            />
          </Form.Group>

          <Button color="teal" fluid size="large">
            Submit Your Resource
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default LoginForm;

//   class ResourceCreation extends Component {
//     state = {}

//     handleChange = (e, { value }) => this.setState({ value })

//     render() {
//       const { value } = this.state
//       return (

//         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
//             <Grid.Column style={{ maxWidth: 800 }}>
//                 <Header as='h1' color='teal' textAlign='center'>
//                     Create a New Resource Form
//                 </Header>
//             <Form size='large'>
//                 <Segment stacked>
//                         <Form.Group widths='equal'>
//                             <Form.Select
//                                 fluid
//                                 label='Topic'
//                                 options={topics}
//                                 placeholder='Topic'
//                             />
//                             <Form.Select
//                                 fluid
//                                 label='Repository'
//                                 options={repositories}
//                                 placeholder='Respository'
//                             />
//                             <Form.Select
//                                 fluid
//                                 label='Thread'
//                                 options={threads}
//                                 placeholder='Thread'
//                             />
//                         </Form.Group>

//                         <Form.Group widths='equal'>
//                             <Form.Input fluid label='Link' placeholder='Link' />
//                         </Form.Group>

//                         <Form.Group inline>
//                             <label>Proficiency</label>
//                             <Form.Radio
//                                 label='Beginner'
//                                 value='sm'
//                                 checked={value === 'sm'}
//                                 onChange={this.handleChange}
//                             />
//                             <Form.Radio
//                                 label='Intermediate'
//                                 value='md'
//                                 checked={value === 'md'}
//                                 onChange={this.handleChange}
//                             />
//                             <Form.Radio
//                                 label='Advanced'
//                                 value='lg'
//                                 checked={value === 'lg'}
//                                 onChange={this.handleChange}
//                             />
//                     </Form.Group>

//                     <Form.TextArea label='About' placeholder='Include more information about your submission...' />
//                     <Form.Checkbox label='I agree to the Terms and Conditions' />

//                     <Button color='teal' fluid size='large'>
//                         Submit
//                     </Button>
//                 </Segment>
//             </Form>
//         </Grid.Column>
//     </Grid>

//       )
//     }
//   }
// export default ResourceCreation
