import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';

class HeaderLogo extends Component {
  render() {
    return (
      <Grid.Column width={5} className="header-content">
        <NavLink to="/">
          <Menu.Item>
            <h1>DEF3NSE</h1>
          </Menu.Item>
        </NavLink>
      </Grid.Column>
    );
  }
}

export default HeaderLogo;
