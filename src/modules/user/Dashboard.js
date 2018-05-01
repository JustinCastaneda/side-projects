import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Headerlogo from '../common/Headerlogo'
import Clock from './Clock'
import Dashlinks from './Dashlinks'
import Navigationtabs from './Navigationtabs'
import Roundendoverlay from './Roundendoverlay'
import Ioctabs from './Ioctabs'
import Centernav from './Centernav'
import Leaderboard from './Leaderboard'
import Gamelog from './Gamelog'
import Viewsubmissions from './Viewsubmissions'

const styles = {
  gridRow: {
    padding: '0'
  }
}

//Styled Components
const Styledgrid = styled(Grid)`
  /* &&& for specificity override */
  &&&&& {
    max-width: 95rem;
    margin: 0 auto !important;
    &.blur {
      filter: blur(4px);
    }
  }
`;


// To do:
/* Make Cenvernav render a different component depending on what has been clicked
 - <Viewsubmissions />
 - </Artifactinfo />
 - Etc.
*/
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerComponent:  {Viewsubmissions}, // Needs work
      roundEnd: false,
      roundNumber: 1,
      nextRound: `15 : 00 : 00`
    }
  }

  render() {
    return (
      <div className="wrapper ui">
        {this.state.roundEnd ? <Roundendoverlay roundNumber={this.state.roundNumber} nextRound={this.state.nextRound}/> : '' }
        <Styledgrid padded className={this.state.roundEnd ? 'blur' : ''}>
          <Grid.Row className="mainHeader">
            <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
            <Clock />
            <Dashlinks />
          </Grid.Row>
        </Styledgrid>
        <Styledgrid padded className={`game ${this.state.roundEnd ? `blur` : ''}`}>
          <Grid.Row style={styles.gridRow}>
            <Grid.Column width={4} className="main">
              <div className="top-left-nav region">
                <div className="inner-col-wrap">
                  <h2>Navigation</h2>
                  <Navigationtabs />
                </div>
              </div>
              <div id="bottom-left" className="bottom-left-nav region">
                <div className="inner-col-wrap">
                  <Ioctabs />
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8} className="main">
              <div className="center-content region">
                <div className="inner-col-wrap">
                  <h2>Intelligence</h2>
                  <Centernav centerComponent={this.state.centerComponent}/>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={4} className="main">
              <div className="top-right-nav region">
                <div className="inner-col-wrap">
                  <h2>Leaderboard</h2>
                  <Leaderboard />
                </div>
              </div>
              <div className="bottom-right-nav region">
                <div className="inner-col-wrap">
                  <h2>Game Log</h2>
                  <Gamelog />
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Styledgrid>
      </div>
    );
  }
}

export default Dashboard;
