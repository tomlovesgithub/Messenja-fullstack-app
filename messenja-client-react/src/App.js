import React, { Component } from 'react';
import MessageList from './Components/messageList';
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


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our scree
  render() {
    return (
      <center>
      <Header />

      <MessageList
       messages ={this.state.messages}
       loaded = {this.state.loaded}
       />
      </center>
    );
  }
}

export default App;
