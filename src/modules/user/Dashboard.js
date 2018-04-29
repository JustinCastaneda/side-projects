import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Headerlogo from '../common/Headerlogo'
import Clock from './Clock'
import Dashlinks from './Dashlinks'
import Navigationtabs from './Navigationtabs'
import Ioctabs from './Ioctabs'
import Centernav from './Centernav'
import Leaderboard from './Leaderboard'
import Gamelog from './Gamelog'

const styles = {
  gridRow: {
    padding: '0'
  }
}

class Dashboard extends Component {
  render() {
    return (
      <div className="wrapper ui">
        <Grid padded>
          <Grid.Row className="mainHeader">
            <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
            <Clock />
            <Dashlinks />
          </Grid.Row>
        </Grid>
        <Grid padded className="game">
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
                  <Centernav />
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
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
