import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Archives from "./components/Archives";
import Project from "./components/Project";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="archives" component={Archives}/>
            <Route path="project/:name" name="project" component={Project}/>
        </Route>

    </Router>,
  document.getElementById('root')
);
