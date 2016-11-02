import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import Archives from './components/Archives'
import Project from './components/Project'
import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import {Navbar,NavItem, Nav} from 'react-bootstrap';


var config = {
    apiKey: "AIzaSyDGf6Nm2OoONeW9Mi3d0T869abk-QTMCjM",
    authDomain: "honorcode-7e07a.firebaseapp.com",
    databaseURL: "https://honorcode-7e07a.firebaseio.com",
    storageBucket: "honorcode-7e07a.appspot.com",
    messagingSenderId: "275879917724"
};
firebase.initializeApp(config);

// let routes = (
//     <Route name="app" path="/" handler={App}>
//     <Route name="archives" path="/archives" handler={Archives}/>
//     </Route>
// );


class App extends Component {
    constructor(props, context){
        super(props,context)
        this.state = {
            loggedIn: (null !== firebase.auth().currentUser)
        }
    }
        componentWillMount() {
        firebase.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
            loggedIn: (null !== firebaseUser)
        })

        if (firebaseUser) {
            console.log("Logged IN", firebaseUser);
        } else {
            console.log('Not logged in');
        }
    });

    }
    render(){
        var loginOrOut;
        var register;
        var viewable;
        if (this.state.loggedIn) {
            loginOrOut = <NavItem>
            <Link to="/logout" className="navbar-brand">Logout</Link>
                </NavItem>;
            viewable =
            register = null


        } else {
            loginOrOut = <NavItem>
            <Link to="/login" className="navbar-brand">Login</Link>
                </NavItem>;
            register = <NavItem>
            <Link to="/register" className="navbar-brand">
                Register
                </Link>
                </NavItem>;
        }
        return(
        <span>
        <Navbar>
            <Nav>
            <Navbar.Header>
            <Navbar.Brand>
                <NavItem>
                    <Link to="/" className="navbar-brand">
                        Honor Code
                    </Link>
                </NavItem>
            </Navbar.Brand>
            </Navbar.Header>
            </Nav>
            <Nav pullRight>
            <NavItem>
            <Link to="/" className="navbar-brand">
            Home
            </Link>
            </NavItem>
            <NavItem>
            <Link to="/archives" className="navbar-brand">
            Projects
            </Link>
            </NavItem>
            {register}
            {loginOrOut}
        </Nav>
        </Navbar>
        <div className="container">
            <div className="row">
            {this.props.children}
    </div>
        </div>
        </span>
        )}

}

export default App;
