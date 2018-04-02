import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

const styles = {
  root: {

  },
  column: {
    height: '5rem',
    borderTop: 'none'
  },
  centerColumn: {
    height: '6rem',
    borderTop: 'none'
  }

}

class Clock extends Component {
  render() {
    return (
      <Grid.Column width={6}>
        <Grid className="clock">
          <Grid.Column width={5} className="clock-regions vone" style={styles.column}>
            <Grid padded>
              <Grid.Column width={5}>
                <svg width="21" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M20.093 2.733L11.49.14a3.578 3.578 0 0 0-1.978 0L.907 2.733c-1.213.356-1.206 2.055 0 2.409l.912.275c-.11.35-.153.72-.169 1.132a.918.918 0 0 0-.007 1.598l-.33 4.17a.263.263 0 0 0 .262.283h1.05c.153 0 .274-.13.262-.283l-.33-4.17A.918.918 0 0 0 2.57 6.56c.014-.338.049-.621.133-.877l1.928.581c-.197 1.314-.43 2.878-.43 2.913 0 1.932 4.352 2.373 6.3 2.373 1.948 0 6.3-.441 6.3-2.373 0-.035-.233-1.599-.43-2.913l3.723-1.122c1.21-.355 1.208-2.055 0-2.409zm-4.346 6.465c-.26.777-2.622 1.302-5.247 1.302s-4.987-.525-5.247-1.302l.394-2.627L9.51 7.736a3.578 3.578 0 0 0 1.978 0l3.864-1.165.394 2.627zm4.047-5.064l-8.598 2.594a2.53 2.53 0 0 1-1.392 0L1.212 4.136l-.006-.002a.202.202 0 0 1 0-.393l8.598-2.594a2.53 2.53 0 0 1 1.392 0l8.592 2.592.006.002a.202.202 0 0 1 0 .393z" fill="#2185D0" fillRule="nonzero"/></svg>
              </Grid.Column>
              <Grid.Column width={11}>
                <div className="text">
                  Knowledge<span>Exchange</span>
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={6} className="two clock-regions" style={styles.centerColumn}>
            <div>two</div>
          </Grid.Column>
          <Grid.Column width={5} className="three clock-regions" style={styles.column}>
            <div>three</div>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    );
  }
}

export default Clock;
