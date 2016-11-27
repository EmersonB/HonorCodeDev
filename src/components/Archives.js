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
        this.searchForProjects = this.searchForProjects.bind(this)
        this.state = {
            description: '',
            name: '',
            projects: [],
            searched: [],
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
                projects: currentProjects.slice(),
                searched: currentProjects
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
    searchForProjects(event){

         console.log(this.state.searched)
         var searchTemp = this.state.projects.slice()
        for(var count = 0; count<this.state.searched.length; count++){
            if(searchTemp[count]!=null && searchTemp[count].name.toLowerCase().indexOf(event.target.value)==-1){
                console.log(searchTemp[count].name)
                searchTemp[count] = null
            }
        }
        this.setState({
           searched:searchTemp
        })
        console.log(this.state.searched)
    }
    submitProject(event) {
        var user = firebase.auth().currentUser;
        var userName = user.displayName;
        if (this.state.name!= "" && this.state.description != "") {
        const nextProject = {
            id: this.state.projects.length,
            name: this.state.name,
            description: this.state.description,
            createdBy: userName
        }
            this.state.name = ""
            this.state.description = ""
        firebase.database().ref('projects/' + nextProject.id).set(nextProject)
    }
    }
    render(){
        //console.log(this.state.searched)
        var currentProjects = this.state.searched.map((project,i) =>{
                if(project!=null){
                var head = <h3>{project.name} <Link to={"/project/"+project.id}><i className="fa fa-hand-o-right" aria-hidden="true"></i></Link></h3>
                return (
            <div>
            <ListGroupItem header={head} key = {project.id}>
            Created By: {project.createdBy}
            </ListGroupItem>
            </div>
    )}
    })
        var searchProjects;
        var viewable;
        if (this.state.loggedIn) {
            viewable = <div>
            <br/>
            <FormControl onChange={this.searchForProjects} type="text" placeholder="Search projects"/>
                    <br/>
            <ListGroup className ="scrolly2">
            {currentProjects}
            </ListGroup>
                <FormControl value={this.state.name} onChange={this.updateName} type="text" placeholder="Name"/>
                <FormControl value={this.state.description} onChange={this.updateDescription} type="text" placeholder="Description"/>
                <Button bsStyle="primary" onClick={this.submitProject}> Create New Project </Button>
            </div>;


        } else {
            viewable = <div>
                <h3 className="wow fadeInLeft lead2">
                Please login or signup to see projects.
                </h3>
                <div className="col-xs-6 wow fadeInLeft lead2" data-wow-delay="0.4s">
                <a className="btn btn-secondary btn-lg" >
                <Link to="/login" className="">
                >Login <span className="white light fa fa-hand-o-right"> </span>
                </Link>
                </a>
                <a className="btn btn-secondary btn-lg" >
                <Link to="/register" className="">
                >Register <span className="white light fa fa-hand-o-right"> </span>
                </Link>
                </a>
                </div>
                </div>;
        }
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Explore </h1>
                <h2> See all the community created study guides in one place.</h2>
                {viewable}
            </div>
    )

    }
}

export default Archives;