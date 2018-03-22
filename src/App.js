import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Router, Route } from 'react-router-dom';

// Components Area
import { Home, Dashboard } from './modules';

class App extends PureComponent {
  render() {
    return (
      <Router history={this.props.history}>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );

  }
}

export default App;
