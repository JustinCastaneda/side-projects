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
    max-width: 60rem;
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
  overflow: auto;
  max-height: 80%;
  h1 {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px #2185D0;
    span {
      display: block;
      font-size: 1.75rem;
      font-family: inherit;
    }
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

const Styledlist = styled.ul`
  list-style: none;
  text-align: left;
  padding-left: 2rem;
  font-size: 1rem;
`;

class Roundpreviewoverlay extends Component {
  render() {
    return (
      <Styledoverlay>
        <div>
          <Styledsection>
            <h1>Preview Next Round</h1>
            <p>Te eros apeirian adipisci qui. Mnesarchum inciderint sit te, eam ei eros natum vituperata.</p>
            <h3>Gameplay</h3>
            <p>Ei pri tale case postulant. Ea fabulas senserit vis, ius persius dolores et, audire definitiones no quo. Magna paulo nec at. Et viderer oportere nec, mel dolor splendide at. Vidit causae habemus ex vim, duo nobis molestie percipit ei, quot summo vocibus ea vix.</p>
            <h3>Objectives</h3>
            <p>Cu eum saperet oporteat detraxit, fastidii oporteat vel an. Id sed tollit honestatis. At facilis commune oporteat pro.</p>
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

export default Roundpreviewoverlay;
