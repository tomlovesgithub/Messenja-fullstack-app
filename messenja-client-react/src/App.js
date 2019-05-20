import React, { Component } from 'react';
import MessageList from './Components/messageList';
import MessageForm from './Components/messageForm';
import Header from './Components/Header';
import axios from "axios";
const PORT = 3001;

class App extends Component {
  // initialize our state
  constructor(){
    super();
    this.state = {
      messages: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      loaded: false
    };
  }
// when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getMessagesFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getMessagesFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  inputElement = React.createRef()

  // our first get method that uses our backend api to
  // fetch data from our database
  getMessagesFromDb = () => {
    axios.get(`http://localhost:${PORT}/messages`)
      .then((res) => { this.setState({ messages: res.data.data.message, loaded: true }); })
      .catch((err) => {console.log(err);});
  };

  // our put method that uses our backend api
  // to create new query into our database
  putMessageToDB = message => {
    axios.post(`http://localhost:${PORT}/messages/create`, {
      message: message
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.messages.forEach(message => {
      if (message.id === idTodelete) {
        objIdToDelete = message._id;
      }
    });

    axios.delete(`http://localhost:${PORT}/messages/delete`, {
      messages: {
        id: objIdToDelete
      }
    });
  };
  // our update method that uses our backend api
  // to overwrite existing database information

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.messages.forEach(message => {
      if (message.id === idToUpdate) {
        objIdToUpdate = message._id;
      }
    });

    axios.post(`http://localhost:${PORT}/messages/update`, {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our scree
  render() {
    return (
      <center>
      <Header />
      <MessageForm
      addMessage={this.putMessageToDB}
      inputElement={this.inputElement}
      handleInput={this.handleInput}
      currentMessage={this.state.message}
      />

      <MessageList
       messages ={this.state.messages}
       loaded = {this.state.loaded}
       deleteFromDB = {this.deleteFromDB}
       />
      </center>
    );
  }
}

export default App;
