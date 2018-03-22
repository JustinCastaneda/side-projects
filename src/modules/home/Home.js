import React, { Component } from 'react';
import { Grid, Button} from 'semantic-ui-react';

import HeaderLogo from '../common/Headerlogo';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center'
  },
  title: {
    fontSize: '7rem',
    margin: '0'
  },
  sub: {
    color: '#eee',
    fontSize: '2rem'
  }
}

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Grid padded>
          <Grid.Row className="header" style={styles.head}>
            <HeaderLogo />
            <Grid.Column width={6}>
              <div style={styles.root}>
                <h1 style={styles.title}>DEF3NSE</h1>
                <p style={styles.sub} className="sub">A Cyber Security Game</p>
                <Grid>
                  <Grid.Row>
                    <Button>Login</Button>
                    <Button>Register</Button>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
