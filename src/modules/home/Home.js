import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'
import Headerlogo from '../common/Headerlogo'
import styled from 'styled-components';

// Styled Components

const Styledgrid = styled(Grid)`
  width: 22rem;
  &&>.row {
    justify-content: space-around;
  }
`;

const Centercolumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const Styledsubhead = styled.h3`
  color: #eee;
  font-size: 2rem;
  padding: .8rem 0 2rem 0;
  margin: 0 0 .5rem;
  font-weight: 400;
`;


const Stylednavlink = styled(NavLink)`
  display: flex;
  width: 10rem;
  &:hover, &:focus, &:active, &:visited {
    outline-width: 0;
  }
`;

const Styledbutton = styled(Button)`
  /* &&& for specificity override */
  &&& {
    font-size: 1rem;
    display: flex;
    flex: 1 1 10rem;
    padding: 1rem 0;
    margin: 0;
    text-align: center;
    justify-content: center;
    color: #fff;
    background: #2185D0;
    &:hover, &:focus {
      background: #0092ff;
    }
  }
`;

// States


// Component

class Home extends Component {
  render() {
    return (
      <div className="wrapper fixed">
        <Grid padded>
          <Grid.Row className="header">
            <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
            <Grid.Column width={6}>
              <Centercolumn>
                <Headerlogo fontSize="7rem">DEF3NSE</Headerlogo>
                <Styledsubhead>A Cyber Security Game</Styledsubhead>
                <Styledgrid>
                  <Grid.Row>
                    <Stylednavlink to="/login"><Styledbutton type="submit">Login</Styledbutton></Stylednavlink>
                    <Stylednavlink to="/signup"><Styledbutton type="submit">Register</Styledbutton></Stylednavlink>
                  </Grid.Row>
                </Styledgrid>
              </Centercolumn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
