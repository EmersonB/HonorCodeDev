import React, { Component } from 'react';
import * as firebase from 'firebase'
import Project from './Project'
import { Link,Router, Route, IndexRoute, hashHistory } from "react-router";
import {ListGroup, ListGroupItem, Button, FormControl} from 'react-bootstrap';

class Archives extends Component {
    constructor(props, context){
        super(props,context)
        this.updateDescription = this.updateDescription.bind(this)
        this.updateName = this.updateName.bind(this)
        this.submitProject = this.submitProject.bind(this)
        this.state = {
            description: '',
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
    updateDescription(event){
        console.log('updateDescription:'+event.target.value)
        this.setState({
            description:event.target.value
        })
    }
    submitProject(event) {
        if (this.state.name!= "" && this.state.description != "") {
        const nextProject = {
            id: this.state.projects.length,
            name: this.state.name,
            description: this.state.description
        }
            this.state.name = ""
            this.state.description = ""
        firebase.database().ref('projects/' + nextProject.id).set(nextProject)
    }
    }
    render(){
        console.log(this.state.projects.length)
        const currentProjects = this.state.projects.map((project,i) =>{
                return (
            <div>
            <ListGroupItem header={project.name} key = {project.id}>
                <Link to={"/project/"+project.id}>{project.description}</Link>
            </ListGroupItem>
            </div>
    )
    })
        var searchProjects;
        var viewable;
        if (this.state.loggedIn) {
            viewable = <div>
            <br/>
            <ListGroup>
            {currentProjects}
            </ListGroup>
                <FormControl value={this.state.name} onChange={this.updateName} type="text" placeholder="Name"/>
                <FormControl value={this.state.description} onChange={this.updateDescription} type="text" placeholder="Description"/>
                <Button bsStyle="primary" onClick={this.submitProject}> Create New Project </Button>
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