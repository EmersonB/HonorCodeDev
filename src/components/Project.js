import React, { Component } from 'react';
import * as firebase from 'firebase'
import ChatRoom from './ChatRoom'
import Notes from './Notes'
import MyDropZone from './fileSubmit'
class Project extends Component {

    constructor(props, context){
        super(props,context)
        this.props = {
            name: ''
        }
    }
    render(){
        return(
            <div>
            {this.name}
            <ChatRoom name={this.props.name}/>
            <br/>
            <Notes name={this.props.name}/>
            <br />
            Submit Files
            <MyDropZone name={this.props.name}/>
            </div>
    )

    }
}

export default Project;