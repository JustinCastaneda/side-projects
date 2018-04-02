import { compose, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middleware = [
    createLogger()
];

const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
    rootReducer,
    {},
    enhancers
);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

export { store };
