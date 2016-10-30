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
            <li key = {project.id}>
                <Link to={"/project/"+project.id}> {project.name} </Link>
            </li>
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

export default Archives;