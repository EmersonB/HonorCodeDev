import React, { Component } from 'react'
import * as firebase from 'firebase'
import {ListGroup, ListGroupItem, Button, FormGroup, FormControl} from 'react-bootstrap';

class Notes extends Component {
    constructor(props, context){
        super(props,context)
        this.updateSubject = this.updateSubject.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.submitNote = this.submitNote.bind(this)
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

    submitNote(event) {
        console.log('submitNote: ' + this.state.note)
        if (this.state.subject != "") {
        const nextNote = {
            id: this.state.notes.length,
            text: this.state.note,
            subject: this.state.subject
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
                return (
            <ListGroupItem header={note.subject} key = {note.id}>{note.text}</ListGroupItem>
    )
    })
        return (
            <div className="panel panel-primary">
            <div className="panel-heading"> Notes </div>
            <div className="panel-body">
            <ListGroup>
            {currentNotes}
            </ListGroup>
            <FormGroup controlId="formControlsTextarea">
            <FormControl value={this.state.subject} onChange={this.updateSubject} type="text" placeholder='Subject'/>
            <FormControl componentClass="textarea" value={this.state.note} onChange={this.updateNote} type="text" placeholder="Note"/>
            <Button bsStyle="primary" onClick={this.submitNote}> Submit Note </Button>
            </FormGroup>
            </div>
            </div>
    )

    }
}

export default Notes