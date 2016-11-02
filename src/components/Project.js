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
        console.log(this.props.params.name)
        return(
            <div>
            {this.name}
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