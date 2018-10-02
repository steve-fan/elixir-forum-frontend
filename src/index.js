import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Router, Route } from 'react-router-dom';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { Home } from './components';

import "./styles/index.css"

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route extact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
