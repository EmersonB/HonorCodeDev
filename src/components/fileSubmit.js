import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import * as firebase from 'firebase'
import {Label,ListGroup, ListGroupItem, Button} from 'react-bootstrap';

class MyDropzone extends Component {
    constructor(props,context) {
        super(props,context);
        this.onDrop = this.onDrop.bind(this);
        this.props = {
            name: ''
        },
        this.state = {
            files: [],
            urls: []
        }

    }
    componentDidMount(){
        var storageRef = firebase.storage().ref();
        var tempUrls = [];
        //console.log('componentDidMount')
        firebase.database().ref('projects/'+this.props.name+'/files/').on('value',(snapshot)=> {
            var tempUrls = [];
            const currentFiles = snapshot.val();
            //console.log("current files:" + currentFiles.length)
            if(currentFiles != null)
            {
            this.setState({
                files: currentFiles
            });
                if(this.state.files.length == 0)
                {
                    location.reload();
                    console.log("dead");
                }
                console.log("current files:" + currentFiles.length);
                console.log("files:" + this.state.files.length);
            this.state.files.map((file,i) => {
                var tempRef = storageRef.child(file);
            tempRef.getDownloadURL().then(function (url) {
                tempUrls.push([file,url])
                //console.log(this.state)
                //console.log(tempUrls)
                this.setState({urls: tempUrls})
                //console.log(this.state.urls)
                // Insert url into an <img> tag to "download"
            }.bind(this)).catch(function (error) {
                switch (error.code) {
                    case 'storage/object_not_found':
                        // File doesn't exist
                        break;

                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;


                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });

        })
        }
    })

    }

    onDrop(files) {
        //console.log('Received files:',files)
        var storageRef = firebase.storage().ref();
        for( var x = 0; x<files.length; x=x+1)
        {
            //console.log(files[x].name)
            const nextFile = {
                id: this.state.files.length+x,
                item: files[x].name
            };
            firebase.database().ref('projects/'+this.props.name+'/files/' + nextFile.id).set(nextFile.item)
            var fileRef = storageRef.child(nextFile.item);
            fileRef.put(files[x]).then(function(snapshot) {
                //console.log('Uploaded a blob or file!');
            });
            this.forceUpdate();
        }


    }
    render(){
        var storageRef = firebase.storage().ref();

        //console.log('-----'+this.state.files.length+'-----');
        //console.log(tempUrls);

        const files = this.state.urls.map((file,i) =>{
            //console.log('ELB'+file)
                return (
                <ListGroupItem>
                    <a href={file[1]}> {file[0]} </a>
                </ListGroupItem>
                )
        })
        console.log("Urls:" +this.state.urls.length);

        return (
            <div className="panel panel-primary">
            <div className="panel-heading"> Files </div>
            <div className="panel-body">
            <ListGroup>
            {files}
            </ListGroup>
            <Dropzone onDrop={this.onDrop}>
            <div>
            <Label>Drop or click to upload files.</Label>
            </div>
            </Dropzone>
            </div>
            </div>
    );
    }
}

export default MyDropzone;