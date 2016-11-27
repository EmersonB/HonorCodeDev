import React, { Component } from 'react';
import * as firebase from 'firebase'
import ChatRoom from './ChatRoom'
import Notes from './Notes'
import MyDropZone from './fileSubmit'
import { Link } from "react-router";

class Project extends Component {

    constructor(props, context){
        super(props,context)
        this.props = {
            name: ''
        },
        this.state = {
            projects: [],
            project: ''
        }
    }
    componentDidMount(){
        firebase.database().ref('projects/').on('value',(snapshot)=> {

            const currentProjects = snapshot.val()

            if(currentProjects != null){
            this.setState({
                projects: currentProjects,
                project: currentProjects[parseInt(this.props.params.name)]
            })
        }
    })}

    render(){

        return(
            <div>
            <div className="container">
            <h3 className > Project Name: </h3><h5>{this.state.project.name}</h5>
            <h3> Description: </h3><h5>{this.state.project.description}</h5>
            <h3></h3>
            </div>
            <ChatRoom name={this.props.params.name}/>
            <br/>
            <Notes name={this.props.params.name}/>
            <br />
            <MyDropZone name={this.props.params.name}/>
            </div>
    )

    }
}

export default Project;