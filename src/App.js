import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'


// Components Area
import { Home, Dashboard, Login, Signup } from './modules';

export default function App({ history }) {
  console.log("=============>", history);
  return (
    <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
          <Route component={Home}/>
        </Switch>
    </ConnectedRouter>
  );
}
