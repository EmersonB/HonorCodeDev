import React, { Component } from 'react'
import * as firebase from 'firebase'
import {ListGroup, ListGroupItem, Button, FormGroup, FormControl} from 'react-bootstrap';

class Notes extends Component {
    constructor(props, context){
        super(props,context)
        this.updateSubject = this.updateSubject.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.submitNote = this.submitNote.bind(this)
        this.onEnter       = this.onEnter.bind(this)

        this.props = {
            name: ''
        },
        this.state = {
            subject:'',
            note: '',
            notes: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        firebase.database().ref('projects/'+this.props.name+'/notes/').on('value',(snapshot)=> {

            const currentNotes = snapshot.val()

            if(currentNotes != null){
            this.setState({
                notes: currentNotes
            })
        }
    }
    )
    }

    updateNote(event){
        console.log('updateNote:'+event.target.value)
        this.setState({
            note:event.target.value
        })
    }
    updateSubject(event){
        console.log('updateSubject:'+event.target.value)
        this.setState({
            subject:event.target.value
        })
    }
    onEnter(event){
        if (event.nativeEvent.keyCode != 13) return;
        event.preventDefault();
        var input = event.target;
        var text = input.value;

        this.submitNote(event);
    }

    componentDidUpdate() {
        const noteList = this.refs.noteList;
        noteList.scrollTop = noteList.scrollHeight;
    }

    submitNote(event) {
        var user = firebase.auth().currentUser;
        var userName = user.displayName;
        console.log('submitNote: ' + this.state.note)
        if (this.state.subject.trim() != "" && this.state.note.trim() !="") {
        const nextNote = {
            id: this.state.notes.length,
            text: this.state.note,
            subject: this.state.subject,
            user: userName
        }
        this.state.note = ""
        this.state.subject = ""
        firebase.database().ref('projects/' + this.props.name + '/notes/' + nextNote.id).set(nextNote)
    }
        // var list = Object.assign([], this.state.messages)
        // list.push(nextMessage)
        // this.setState({
        //     messages: list
        // })
    }
    render(){
        const currentNotes = this.state.notes.map((note,i) =>{
                var head = <h3 className="blue2">{note.subject}</h3>
                return (
            <ListGroupItem header={head} key = {note.id}> <div className="blue2">Created By: {note.user}</div> {note.text}</ListGroupItem>
    )
    })
        return (
            <div className="container">
            <div className="panel panel-primary wow animated fadeInLeft">
            <div className="panel-heading"> Notes </div>
            <div className="panel-body">
            <div className="pre-scrollable scrolly" ref="noteList">
            {currentNotes}
            </div>
            <FormGroup controlId="formControlsTextarea">
            <FormControl value={this.state.subject} onChange={this.updateSubject} type="text" placeholder='Subject' onKeyPress={this.onEnter}/>
            <FormControl componentClass="textarea" value={this.state.note} onChange={this.updateNote} type="text" placeholder="Note"onKeyPress={this.onEnter}/>
            <Button bsStyle="primary" onClick={this.submitNote}> Submit <span className="blue2 light fa fa-paper-plane-o"></span> </Button>
            </FormGroup>
            </div>
            </div>
            </div>
    )

    }
}

export default Notes