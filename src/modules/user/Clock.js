import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Gradcap from '../../resources/svg/Gradcap'
import Shieldicon from '../../resources/svg/Shieldicon'


const Styledgrid = styled(Grid)`
  &&& {
    .clock-regions {
      height: 100%;
      color: #fff;
      text-align: center;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      background: rgba(0, 0, 0, 0.76);
      border: 2px solid #2185D0;
      box-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45);
      font-size: .9rem;
      line-height: 1.2;
      font-family: "Industry Inc", sans-serif;
      border-top: 0;
      height: 4.75rem;
    }
    .clockLeft {
      border-radius: 0 0 0 10px;
      border-right-width: 0;
    }
    .clockCenter {
      border-radius: 0 0 10px 10px;
      height: 5.5rem;
    }
    .clockRight {
      border-radius: 0 0 10px 0;
      border-left-width: 0;
    }
  }
`;

const Styledkxlink = styled.a`
  display: flex;
  justify-content: center;
  margin-top: .3rem;
  svg {
    display: flex;
    margin: .5rem .5rem 0 0;
  }
  &:hover {
    svg {
      fill: #fff;
    }
    div {
      text-shadow: 0 0 12px #2185D0;
    }
  }
`;

const Styledkx = styled.div`
  text-align: left;
  color: #fff;
  font-size: .9rem;
  font-weight: 500;
  font-family: 'Industry Inc', sans-serif;
  svg {
    margin-right: .5rem;
  }
  span {
    font-family: inherit;
    display: block;
  }
`;

const Styledclock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  line-height: 1;
  padding: .3rem 0;
  h4 {
    margin: 0;
    padding: 0;
    color: #2185D0;
    font-weight: 900;
  }
  div {
    font-size: 1.8rem;
    font-family: 'Avenir', sans-serif;
    font-weight: 900;
  }
  aside {
    font-weight: 900;
    text-transform: uppercase;
    font-size: .8rem;
    color: #eee;
    line-height: 1.4;
  }
`;

const Styledscore = styled.div`
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: .5rem 0;
  }
  svg {
    display: flex;
    margin-right: 1rem;
  }
  div {
    font-size: 2rem;
    font-family: 'Avenir', sans-serif;
    font-weight: 900;
  }
  aside {
    text-transform: uppercase;
    font-weight: bold;
    font-size: .8rem;
  }
`;


// Regions

const Knowledgelink = () => (
  <Styledkxlink target="_blank" rel="noopener noreferrer" href="https://workshop.def3nse.net/">
    <Gradcap iconFill="#2185D0"/>
    <Styledkx>Knowledge<span>Exchange</span></Styledkx>
  </Styledkxlink>
)

const Clockregion = () => (
  <Styledclock>
    <h4>Click Start to Begin</h4>
    <div>00:00:00</div>
    <aside>Time Remaining</aside>
  </Styledclock>
)

const Scoreregion = () => (
  <Styledscore>
    <section>
      <Shieldicon iconFill="#2185D0"/>
      <div>0</div>
    </section>
    <aside>Cyber Currency</aside>
  </Styledscore>
)

/*
To Do:
Add Clock functionality to <Clockregion />. Sync up with each round.
*/
class Clock extends Component {
  render() {
    return (
      <Grid.Column width={6}>
        <Styledgrid className="clock">
          <Grid.Column width={5} className="clock-regions clockLeft">
            <Knowledgelink />
          </Grid.Column>
          <Grid.Column width={6} className="clock-regions clockCenter">
            <Clockregion />
          </Grid.Column>
          <Grid.Column width={5} className="clock-regions clockRight">
            <Scoreregion />
          </Grid.Column>
        </Styledgrid>
      </Grid.Column>
    );
  }
}

export default Clock;
