import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Router, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { Home } from './components';

import PostShowContainer from "./containers/post/show"
import PostEditContainer from "./containers/post/edit"
import HotPostContainer from "./containers/post/hot"

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
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hot" component={HotPostContainer} />
                <Route path="/p/:postId/edit" component={PostEditContainer} />
                <Route path="/p/:postId" component={PostShowContainer} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
