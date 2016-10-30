import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import * as firebase from 'firebase'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

class MyDropzone extends Component {
    constructor(props,context) {
        super(props,context);
        this.onDrop = this.onDrop.bind(this);
        this.props = {
            name: ''
        },
        this.state = {
            files: []
        }

    }
    componentDidMount(){
        console.log('componentDidMount')
        firebase.database().ref('projects/'+this.props.name+'/files/').on('value',(snapshot)=> {

            const currentFiles = snapshot.val()

            if(currentFiles != null){
            this.setState({
                files: currentFiles
            })
        }
    })}

    onDrop(files) {
        console.log('Received files:',files)
        for( var x = 0; x<files.length; x=x+1)
        {
            const nextFile = {
                id: this.state.files.length+x,
                item: files[x]
            }
            firebase.database().ref('projects/'+this.props.name+'/files/' + nextFile.id).set(nextFile.item)
        }
    }
    render(){
        const files = this.state.files.map((file,i) =>{
                return (
                <ListGroupItem key = {file.id}>
                {file.preview}
                </ListGroupItem>
    )
    })
        return (
            <div className="panel panel-primary">
            <div className="panel-heading"> Files </div>
            <div className="panel-body">
            <ListGroup>
            {files}
            </ListGroup>
            <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            </div>
            </div>
    );
    }
}

export default MyDropzone;