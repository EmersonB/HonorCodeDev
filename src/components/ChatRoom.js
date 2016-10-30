import React, { Component } from 'react'
import * as firebase from 'firebase'
import {ListGroup, ListGroupItem, Button,FormControl} from 'react-bootstrap';

class ChatRoom extends Component {
    constructor(props, context){
        super(props,context)
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.props = {
            name: ''
        },
        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount(){
            console.log('componentDidMount')
            console.log(this.props.name)
            firebase.database().ref('projects/'+this.props.name+'/messages/').on('value',(snapshot)=> {

                const currentMessages =snapshot.val()

                if(currentMessages!=null){
                    this.setState({
                        messages: currentMessages
                    })
            }
            }
        )
    }

    updateMessage(event){
        console.log('updateMessage:'+event.target.value)
        this.setState({
            message:event.target.value
        })
    }

    submitMessage(event){
        console.log('submitMessage: '+this.state.message)
        if(this.state.message != "") {
            const nextMessage = {
                id: this.state.messages.length,
                text: this.state.message
            }
            this.state.message = ""
            firebase.database().ref('projects/' + this.props.name + '/messages/' + nextMessage.id).set(nextMessage)
        }
        // var list = Object.assign([], this.state.messages)
        // list.push(nextMessage)
        // this.setState({
        //     messages: list
        // })
    }
    render(){
        console.log(this.props.name)
        const currentMessage = this.state.messages.map((message,i) =>{
            return (
                <ListGroupItem key = {message.id}>{message.text}</ListGroupItem>
            )
            })
        return (
            <div className="panel panel-primary">
                <div className="panel-heading"> Messages </div>
                <div className="panel-body">
                <ListGroup>
                    {currentMessage}
                </ListGroup>
                <FormControl value={this.state.message} onChange={this.updateMessage} type="text" placeholder="Message"/>
                <br />
                <Button bsStyle="primary" onClick={this.submitMessage}> Submit Message </Button>
            </div>
            </div>
        )

    }
}

export default ChatRoom