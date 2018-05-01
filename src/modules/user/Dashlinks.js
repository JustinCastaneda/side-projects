import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';



/*
To Do:
- Create pages for Lifeline & Profile
- Add Routing links
*/
class Dashlinks extends Component {
  render() {
    return (
      <Grid.Column width={5}>
        <ul className="main-menu">
          <li>Command Control</li>
          <li>Lifeline</li>
          <li>Profile</li>
        </ul>
      </Grid.Column>
    );
  }
}

export default Dashlinks;
