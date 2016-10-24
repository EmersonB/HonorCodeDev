import React, { Component } from 'react'
import * as firebase from 'firebase'

class Notes extends Component {
    constructor(props, context){
        super(props,context)
        this.updateNote = this.updateNote.bind(this)
        this.submitNote = this.submitNote.bind(this)
        this.props = {
            name: ''
        },
        this.state = {
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

    submitNote(event){
        console.log('submitNote: '+this.state.note)
        const nextNote = {
            id: this.state.notes.length,
            text: this.state.note
        }
        firebase.database().ref('projects/'+this.props.name+'/notes/'+nextNote.id).set(nextNote)
        // var list = Object.assign([], this.state.messages)
        // list.push(nextMessage)
        // this.setState({
        //     messages: list
        // })
    }
    render(){
        const currentNotes = this.state.notes.map((note,i) =>{
                return (
            <li key = {note.id}>{note.text}</li>
    )
    })
        return (
            <div>
            <ol>
            {currentNotes}
            </ol>
            <textarea onChange={this.updateNote} type="text" placeholder="Note"/>
            <br />
            <button onClick={this.submitNote}> Submit Note </button>
        </div>
    )

    }
}

export default Notes