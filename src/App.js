import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import ChatRoom from './components/ChatRoom'
import Notes from './components/Notes'
import MyDropZone from './components/fileSubmit'


var config = {
    apiKey: "AIzaSyDGf6Nm2OoONeW9Mi3d0T869abk-QTMCjM",
    authDomain: "honorcode-7e07a.firebaseapp.com",
    databaseURL: "https://honorcode-7e07a.firebaseio.com",
    storageBucket: "honorcode-7e07a.appspot.com",
    messagingSenderId: "275879917724"
};
firebase.initializeApp(config);


class App extends Component {

  render(){
    return(
        <div>
            This is the React App!
            <ChatRoom />
            <br/>
            <Notes />
            <br />
            Submit Files
            <MyDropZone />
        </div>
  )

  }
}

export default App;
