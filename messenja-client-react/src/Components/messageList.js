import React, { Component } from 'react';

class MessageList extends Component {

  // inputElement = React.createRef()

  componentDidUpdate() {
      // console.log(this);
    }

  listBody(message) {
    const { date, content, _id } = message
    console.log(this.props);
        return (
          <li
          style={{ listStyleType: "none" }}
          key={_id}>
          time: {new Date(date).toLocaleDateString()}
          <br />
          date: {new Date(date).toLocaleTimeString()}
          <br />
          message: {content}
          <br />
          <button
          onClick={this.props.deleteFromDB(_id)}>
          Del
          </button>
          </li>
    );
  }
    render() {
    const messages = this.props.messages;
    const messageList = messages.map(this.listBody.bind(this));

    return <div>{messageList}</div>;
  }
}

export default MessageList;
