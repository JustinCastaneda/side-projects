import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'

const Styledoverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0,0,0,.5);
  div {
    height: 100%;
    max-width: 40rem;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Styledsection = styled.section`
  color: #fff;
  background: rgba(0,0,0,.85);
  border: 2px solid #2185D0;
  box-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px #2185D0;
  }
  h3 {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    text-align: left;
  }
  &&& aside {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 2.5rem;
    button {
      min-width: 11rem;
      &:first-child {
        margin-right: 1rem;
      }
    }
  }
`;

class Roundendemailoverlay extends Component {
  render() {
    return (
      <Styledoverlay>
        <div>
          <Styledsection>
            <h1>Round {this.props.roundNumber} Complete!</h1>
            <p>An duo eros percipit, usu ad civibus sapientem. Menandri maiestatis mei te. Ex cum feugiat civibus, vim eius liberavisse id. Sea homero nusquam eloquentiam ne, ne sea dicit eruditi vituperata. Eu ius debitis nominati, putent regione sea ne, eos augue tritani in. Pro cu ullum dissentias, te solum nullam impetus quo, verear insolens inciderint et duo.</p>
            <h3>Next Round Begins in</h3>
            <h3>Watch Your Email for Updates</h3>
            <aside>
              <NavLink to="/leaderboard"><Styledbutton longButton="true">Leaderboard</Styledbutton></NavLink>
              <a href="https://workshop.def3nse.net/"><Styledbutton longButton="true">Workshop</Styledbutton></a>
            </aside>
          </Styledsection>
        </div>
      </Styledoverlay>
    );
  }
}

export default Roundendemailoverlay;
