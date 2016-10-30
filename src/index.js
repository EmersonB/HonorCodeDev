import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Archives from "./components/Archives";
import Project from "./components/Project";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Home from "./Home";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="archives" component={Archives}/>
            <Route path="project/:name" name="project" component={Project}/>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="register" component={Register}/>
        </Route>
        <Route path="/home" component={Home}/>

    </Router>,
  document.getElementById('root')
);
