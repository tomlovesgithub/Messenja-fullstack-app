import React, { Component } from 'react';

class MessageList extends Component {

  // inputElement = React.createRef()

  componentDidUpdate() {
      // console.log(this);
    }

  listBody(message) {
    const { date, content, _id } = message
    // id: {_id}
        return (
          <li
          style={{ listStyleType: "none" }}
          key={_id}>
          <br />
          time:
          <br />
          {new Date(date).toLocaleDateString()}
          <br />
          date:
          <br />
          {new Date(date).toLocaleTimeString()}
          <br />
          message:
          <br />
          {content}
          <br />
          <button
          type="submit"
          onClick={() => { this.props.deleteFromDB(_id)}}>
          Del
          </button>
          </li>
    );
  }
    render() {
    const messages = this.props.messages;
    var messageList = ""
    if (messages.length !== 0) {
      messageList = messages.map(this.listBody.bind(this));
    } else {
      messageList = "No Messages";
  }
    return <div>{messageList}</div>;
  }
}

export default MessageList;
