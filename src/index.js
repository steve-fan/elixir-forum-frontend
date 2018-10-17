import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import { Router, Route, Switch } from 'react-router-dom';
import logger from "redux-logger";
import thunk from "redux-thunk";

import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers/index";
import { Home } from './components';
import NewTopicContainer from "./containers/topic/new"
import ShowTopicContainer from "./containers/topic/show"
import LoginContainer from "./containers/login"

import { fetchCurrentUser } from "./actions/user-action-creator";

import "./styles/index.css"

const history = createHistory();
const middlewares = [routerMiddleware(history), logger, thunk]
const store = createStore(
    reducers,
    compose(applyMiddleware(...middlewares))
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/t/new" component={NewTopicContainer} />
                <Route path="/t/:topicId" component={ShowTopicContainer} />
                <Route path="/login" component={LoginContainer} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

store.dispatch(fetchCurrentUser())

registerServiceWorker();
