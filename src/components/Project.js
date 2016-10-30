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
        }
    }
    render(){
        return(
            //if({this.display}) {
            <div>
            {this.name}
            <ChatRoom name={this.props.name}/>
            <br/>
            <Notes name={this.props.name}/>
            <br />
            Submit Files
            <MyDropZone name={this.props.name}/>
            </div>
            //}
            //else
            //{
            //<div>
            //{this.name}
            //<div>
            //}
    )

    }
}

export default Project;