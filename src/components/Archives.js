import React, { Component } from 'react';
import * as firebase from 'firebase'
import Project from './Project'
import { Link,Router, Route, IndexRoute, hashHistory } from "react-router";

class Archives extends Component {
    constructor(props, context){
        super(props,context)
        this.updateName = this.updateName.bind(this)
        this.submitProject = this.submitProject.bind(this)
        this.state = {
            name: '',
            projects: [],
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
    componentDidMount(){
        firebase.database().ref('projects/').on('value',(snapshot)=> {

            const currentProjects = snapshot.val()

            if(currentProjects != null){
            this.setState({
                projects: currentProjects
            })
        }
    }
    )
    }

    updateName(event){
        console.log('updateName:'+event.target.value)
        this.setState({
            name:event.target.value
        })
    }

    submitProject(event){
        const nextProject = {
            id: this.state.projects.length,
            name: this.state.name
        }
        firebase.database().ref('projects/'+nextProject.id).set(nextProject)
    }
    render(){
        console.log(this.state.projects.length)
        const currentProjects = this.state.projects.map((project,i) =>{
                return (
            <div>
            <li key = {project.id}>
                <Link to={"/project/"+project.id}> {project.name} </Link>
            </li>
            </div>
    )
    })
        var viewable;
        if (this.state.loggedIn) {
            viewable = <div>
            <ul>
            {currentProjects}
            </ul>
            <input onChange={this.updateName} type="text" placeholder="New Project"/>
                <br />
                <button bsStyle="primary" onClick={this.submitProject}> Create New Project </button>
            </div>;


        } else {
            viewable = <div>
                <h2 >
                You must login or register to see projects.
                </h2>
                <div className="col-sm-6 col-sm-offset-3">
                <Link to="/login" className="navbar-brand">
                Login
                </Link>
                <Link to="/register" className="navbar-brand">
                Register
                </Link>
                </div>
                </div>;
        }
        return (
            <div className="col-sm-6 col-sm-offset-3">
                {viewable}
            </div>
    )

    }
}

export default Archives;