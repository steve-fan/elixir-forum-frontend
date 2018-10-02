import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from './app.js';

const GeneRouter = () => (
  <Router>
    <Route exact path="/" component={App} />
  </Router>
);

export default GeneRouter;
