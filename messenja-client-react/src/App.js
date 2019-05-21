import React, { Component } from 'react';
import MessageList from './Components/messageList';
import MessageForm from './Components/messageForm';
import Header from './Components/Header';
const PORT = 3001
const axios = require('axios');

class App extends Component {
  inputElement = React.createRef()
  constructor() {
    super();
    this.state = {
      messages: [],
      currentMessage: {
        content: '',
      },
    };
    this.addMessage.bind(this);
  }

  componentDidMount(){
    this.getMessages()
  }

  handleInput = (e) => {
    const messageContent = e.target.value;
    const currentMessage = { content: messageContent };
    this.setState({
      currentMessage,
    });
  }

  addMessage = (e) => {
    // our put method that uses our backend api
    // to create new query into our database
    // e.preventDefault();
    const newMessage = this.state.currentMessage.content;
    if (newMessage !== '') {
      axios.post(`http://localhost:${PORT}/messages`, {
        content: newMessage
      })
      this.setState({
        currentMessage: {
          content: ""
        }
      })
      console.table(this.state.messages);
    }
  }

  getMessages = () => {
    // our first get method that uses our backend api to
    // fetch data from our database
    axios.get(`http://localhost:${PORT}/messages`)
    .then((res) => { this.setState({ messages: res.data.message, loaded: true }); })
      .catch((err) => {console.log(err);});
  };

  deleteFromDB = idTodelete => {
    // our delete method that uses our backend api
    // to remove existing database information
    let objIdToDelete = null;
    this.state.messages.forEach(message => {
      if (message.id === idTodelete) {
        objIdToDelete = message.id;
      }
    });

    axios.delete(`http://localhost:${PORT}/messages/delete/${idTodelete}`, {
      messages: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    // // our update method that uses our backend api
    // // to overwrite existing database information
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

    render() {

      return (
        <center>
        <Header />
        <MessageForm
        addMessage={this.addMessage}
        inputElement={this.inputElement}
        handleInput={this.handleInput}
        currentMessage={this.state.currentMessage}
        />

        <MessageList
        messages={this.state.messages}
        deleteFromDB={this.deleteFromDB}
        />
        </center>
      )
    }
  }

  export default App
