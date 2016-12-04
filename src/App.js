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
            loggedIn: (null !== firebase.auth().currentUser),
            userName: null
        }
    }
        componentWillMount() {
        firebase.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
            loggedIn: (null !== firebaseUser)
        })

        if (firebaseUser) {
            console.log("Logged IN", firebaseUser);
            var user = firebase.auth().currentUser;
            this.setState({
                loggedIn: (null !== firebaseUser),
                userName:  user.displayName
            })
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
            if(this.state.userName !=null)
                userName = <li><a> Hello {this.state.userName} </a></li>;
            else
                userName=null
            loginOrOut = <li><a>
            <Link to="/logout" className="navbar-brand" className="scroll" >Logout</Link>
                </a></li>;
            register = null
            loginOrOutLi = <li><a><Link to="/logout" className="navbar-brand" className="scroll">Logout</Link> </a></li>;
            registerLi = null

        } else {
            loginOrOut = <li><a>
            <Link to="/login" className="navbar-brand" className="scroll">Login</Link> </a></li>;
            register = <li><a>
            <Link to="/register" className="navbar-brand" className="scroll">
                Register
                </Link>
                </a></li>;
            userName = null
            loginOrOutLi = <li><a className = "scroll" ><Link to="/login" className="navbar-brand" className="scroll">Login</Link> </a></li>;
            registerLi = <li><a className = "scroll"> <Link to="/register" className="navbar-brand" className="scroll"> Register </Link> </a></li>;
        }
        return(
            <div>


        <header>
        <div className="cd-logo"><Link to="/"><img src="img/logo.png" alt=""/></Link></div>

            <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">
            {userName}
            <li><a><div className="btn-primary-inverse2"> <Link to="/archives" className="navbar-brand" className="scroll"> Explore </Link> </div></a></li>
            {loginOrOut}
            {register}
        </ul>
        </nav>

        <a href="#0" className="cd-nav-trigger">Menu<span></span></a>
            </header>
        <div>

            {this.props.children}

        </div>
        </div>

        )}

}

export default App;
