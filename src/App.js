import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import Project from './components/Project'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'


var config = {
    apiKey: "AIzaSyDGf6Nm2OoONeW9Mi3d0T869abk-QTMCjM",
    authDomain: "honorcode-7e07a.firebaseapp.com",
    databaseURL: "https://honorcode-7e07a.firebaseio.com",
    storageBucket: "honorcode-7e07a.appspot.com",
    messagingSenderId: "275879917724"
};
firebase.initializeApp(config);


class App extends Component {
    constructor(props, context){
        super(props,context)
        this.updateName = this.updateName.bind(this)
        this.submitProject = this.submitProject.bind(this)
            this.state = {
                name: '',
                projects: []
            }
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
        const currentProjects = this.state.projects.map((project,i) =>{
                return (
                    <div>
            <li key = {project.id}>{project.name}</li>
            <Project name = {project.id}/>
            </div>
    )
    })
        return (
            <div>
            <ul>
            {currentProjects}
            </ul>
            <input onChange={this.updateName} type="text" placeholder="New Project"/>
            <br />
            <button onClick={this.submitProject}> Create New Project </button>
        </div>
    )

    }
}

export default App;
