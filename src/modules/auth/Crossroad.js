import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Card } from 'semantic-ui-react'
import styled from 'styled-components'
import Headerlogo from '../common/Headerlogo'
import Styledbutton from '../styledcomponents/Styledbutton';


// Styled Components

const Styledgrid = styled(Grid)`
  width: 100%;
  &&>.row {
    justify-content: center;
  }
`;

const Centercolumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const Styledcard = styled(Card)`
  &&&& {
    margin: 1rem;
    padding: 10px;
    text-align: center;
    background: rgba(0,0,0,.75);
    border: 2px solid #2185D0;
    box-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45);
    border-radius: 8px;
    &:hover {
      border-color: #fff;
      div.header {
        text-shadow: 0 0 10px #2185D0;
      }
      button {
        background: #0092ff;
      }
    }
    div.header {
      font-family: 'Industry Inc', 'Lato', sans-serif;
      color: #fff;
      font-size: 1.6rem;
      font-weight: normal;
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #7d7d7d;
    }
    div.description {
      color: #eee;
    }
    button {
      margin: 1.5rem auto 0 auto;
    }
  }
`;


// Component States
// Comming soon...


// Component

class Crossroad extends Component {
  render() {
    return (
      <div className="wrapper fixed">
        <Grid padded>
          <Grid.Row className="header">
            <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
            <Grid.Column width={6}>
              <Centercolumn>

                <a target="_blank" href="https://workshop.def3nse.net/">
                  <Styledcard>
                    <Card.Content>
                      <Card.Header>Workshop</Card.Header>
                      <Card.Description>
                        Lorem ipsum dolor sit amet, est ea amet dicunt lucilius. Blandit officiis te vix. No sit erat exerci pertinacia, eos ei ridens diceret. His corpora singulis at, per error recteque splendide no, clita scripta pri no.
                      </Card.Description>
                      <Styledbutton longButton="true">Go to Workshop</Styledbutton>
                    </Card.Content>
                  </Styledcard>
                </a>

                <NavLink to="/dashboard">
                  <Styledcard>
                    <Card.Content>
                      <Card.Header>Game</Card.Header>
                      <Card.Description>
                        Lorem ipsum dolor sit amet, est ea amet dicunt lucilius. Blandit officiis te vix. No sit erat exerci pertinacia, eos ei ridens diceret. His corpora singulis at, per error recteque splendide no, clita scripta pri no.
                      </Card.Description>
                      <Styledbutton longButton="true">Go to Game</Styledbutton>
                    </Card.Content>
                  </Styledcard>
                </NavLink>

              </Centercolumn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Crossroad;
