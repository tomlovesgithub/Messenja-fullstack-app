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
          <text>
          {new Date(date).toLocaleDateString()}
          </text>
          <br />
          date:
          <br />
          <text>
          {new Date(date).toLocaleTimeString()}
          </text>
          <br />
          message:
          <br />
          <text>
          {content}
          </text>
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
      messageList = messages.map(this.listBody.bind(this)).reverse();
    } else {
      messageList = "No Messages";
  }
    return <div id="msgList">{messageList}</div>;
  }
}

export default MessageList;
