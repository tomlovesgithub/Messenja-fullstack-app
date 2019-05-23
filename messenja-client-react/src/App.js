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

  // componentDidMount(){
  //   this.getMessages()
  // }

  handleInput = (e) => {
    console.log('in handleInput')
    // console.log(e)
    e.preventDefault();
    const messageContent = e.target.value;
    const currentMessage = { content: messageContent };
    this.setState({
      currentMessage,
    });
  }

  addMessage = (e) => {
    // our put method that uses our backend api
    // to create new query into our database
    console.log('in addMessage')
    e.preventDefault();
    const newMessage = this.state.currentMessage.content;
    if (newMessage !== '') {
      axios.post(`http://localhost:${PORT}/messages`, {
        content: newMessage
      }).then((res) => {
          console.log(res);
          console.log(res.data.message);
          this.setState({
            currentMessage: {
              content: ""
            },
            messages: [...this.state.messages, res.data.message],
          })
        }
      )

      console.table(this.state.messages);
    }
  }

  getMessages = () => {
    console.log('get message')
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
        addMessage={(e) => this.addMessage(e)}
        inputElement={this.inputElement}
        handleInput={(e) => this.handleInput(e)}
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
