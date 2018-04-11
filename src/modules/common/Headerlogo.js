import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import styled from 'styled-components';



const Styledaechone = styled.h1`
  color: #FFFFFF;
  font-family: "Industry Inc", sans-serif;
  font-size: ${props => props.fontSize};
  line-height: 1;
  font-weight: normal;
  text-shadow: 0 0 10px #2185D0;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: .8rem;
  padding-left: ${props => props.paddingLeft ? '28px' : '0' };
  padding-right: ${props => props.paddingRight ? '20px' : '0' };
`;


class HeaderLogo extends Component {
  render() {
    return (
      <Grid.Column width={5}>
        <NavLink to="/">
          <Menu.Item>
            <Styledaechone fontSize={this.props.fontSize} paddingLeft={this.props.paddingLeft}>{this.props.children}</Styledaechone>
          </Menu.Item>
        </NavLink>
      </Grid.Column>
    );
  }
}

export default HeaderLogo;
