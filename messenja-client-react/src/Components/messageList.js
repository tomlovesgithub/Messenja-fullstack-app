import React, { Component } from 'react';

class MessageList extends Component {
  listBody(message) {
    const { date, content, id } = message
    return (
      <ul style={{ listStyle: "none" }} >
      { <li style={{ padding: "10px" }} key={id}>
      <span style={{ color: "gray" }}> id: </span> {id} <br />
      <span style={{ color: "gray" }}> Date: </span> {new Date(date).toLocaleDateString()} <br />
      <span style={{ color: "gray" }}> Time: </span> {new Date(date).toLocaleTimeString()} <br />
      <span style={{ color: "gray" }}> content: </span>
      {content}
      <br/>
      <button>
      DEL
      </button>
      </li>
    }
    </ul>
  );
}
render() {
    const messages = this.props.messages;
    console.log(this);
    const messageList = messages.map(this.listBody);
    return <div>{messageList}</div>;
  }
}

export default MessageList;