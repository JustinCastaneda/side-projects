import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch, Fade } from 'react-router-dom';


// Components Area
import { Home, Dashboard, Login, Signup } from './modules';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter history={this.props.history}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
          <Route component={Home}/>
        </Switch>
      </BrowserRouter>
    );

  }
}

export default App;
