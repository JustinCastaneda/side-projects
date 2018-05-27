import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/*
To Do:
- Create pages for Lifeline & Profile
*/
class Dashlinks extends Component {
  render() {
    return (
      <Grid.Column width={5}>
        <ul className="main-menu">
          {/* <li>Command Control</li> */}
          <li><NavLink to="/">Round Preview</NavLink></li>
        </ul>
      </Grid.Column>
    );
  }
}

export default Dashlinks;
