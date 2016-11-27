import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import Archives from './components/Archives'
import Project from './components/Project'
import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'


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
        var loginOrOutLi;
        var register;
        var registerLi;
        var userName;
        if (this.state.loggedIn) {
            var user = firebase.auth().currentUser;
            console.log(user);
            userName = <a> Hello {user.displayName} </a>;
            loginOrOut = <a>
            <Link to="/logout" className="navbar-brand" className="scroll" >Logout</Link>
                </a>;
            register = null
            loginOrOutLi = <li><a><Link to="/logout" className="navbar-brand" className="scroll">Logout</Link> </a></li>;
            registerLi = null

        } else {
            loginOrOut = <a>
            <Link to="/login" className="navbar-brand" className="scroll">Login</Link> </a>;
            register = <a>
            <Link to="/register" className="navbar-brand" className="scroll">
                Register
                </Link>
                </a>;
            userName = null
            loginOrOutLi = <li><a className = "scroll" ><Link to="/login" className="navbar-brand" className="scroll">Login</Link> </a></li>;
            registerLi = <li><a className = "scroll"> <Link to="/register" className="navbar-brand" className="scroll"> Register </Link> </a></li>;
        }
        return(
            <div>
        <header>
        <div className="container">
            <div className="row">
            <div className="col-xs-4 text-left navbar-nav signin">
            {/*<a href="#pricing" className="scroll">Pricing</a>&nbsp; &nbsp;<a href="#">Sign in</a>*/}
            <a> <Link to="/archives" className="navbar-brand" className="scroll"> Explore </Link> </a>&nbsp; &nbsp;
            <a> <Link to="/" className="navbar-brand" className="scroll"> About Us </Link> </a>
            </div>
            <div className="col-xs-4 text-center logo">
            <a href="/"><img src="img/logo.png" alt="Logo"/></a>
            </div>
            <div className="col-xs-4 text-right navbar-nav signin text-right">
            {/*<a href="#pricing" className="scroll">Pricing</a>&nbsp; &nbsp;<a href="#">Sign in</a>*/}
            {userName}&nbsp; &nbsp;{loginOrOut}&nbsp; &nbsp;{register}
            </div>
            </div>



        </div>
        </header>
        <div>

            {this.props.children}

        </div>
        </div>

        )}

}

export default App;
