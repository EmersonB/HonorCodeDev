import React, { Component } from 'react'
import * as firebase from 'firebase'
import {ListGroup, ListGroupItem, Button,FormControl} from 'react-bootstrap';
import $ from 'jquery';

class ChatRoom extends Component {
    constructor(props, context){
        super(props,context)
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.onEnter       = this.onEnter.bind(this)
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

    onEnter(event){
    if (event.nativeEvent.keyCode != 13) return;
    event.preventDefault();
    var input = event.target;
    var text = input.value;

    this.submitMessage(event);
    }

    updateMessage(event){
        console.log('updateMessage:'+event.target.value)
        this.setState({
            message:event.target.value
        })
    }

    componentDidUpdate() {
        const messageList = this.refs.messageList;
        messageList.scrollTop = messageList.scrollHeight;
    }

    submitMessage(event){
        var user = firebase.auth().currentUser;
        var userName = user.displayName;
        console.log('submitMessage: '+this.state.message)
        if(this.state.message.trim() != "") {
            const nextMessage = {
                id: this.state.messages.length,
                text: this.state.message,
                user: userName
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
                <ListGroupItem key = {message.id}><a className="blue2">{message.user}</a>: {message.text}</ListGroupItem>
            )
            })
        return (
            <div className="container">
            <div className="panel panel-primary wow animated fadeInLeft">
                <div className="panel-heading"> Messages </div>
                <div className="panel-body">
                <div  className="pre-scrollable scrolly" ref="messageList">
                    {currentMessage}
                </div>
                <FormControl value={this.state.message} onChange={this.updateMessage} type="text" placeholder="Message" onKeyPress={this.onEnter}/>
                <br />
                <Button  bsStyle="primary" onClick={this.submitMessage}> Send <span className="blue2 light fa fa-paper-plane-o"></span></Button>
            </div>
            </div>
            </div>
        )

    }
}

export default ChatRoom