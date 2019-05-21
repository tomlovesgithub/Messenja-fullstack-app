import React, { Component } from 'react'

class MessageForm extends Component {

  componentDidUpdate() {
      this.props.inputElement.current.focus()
      // console.log(this);
    }

  render() {
    return (
      <form onSubmit={this.props.addMessage}>
            <textarea
              ref={this.props.inputElement}
              value={this.props.currentMessage.content}
              onChange={this.props.handleInput}
            />
            <br/>
            <button
            type="submit"
            >
            SEND
            </button>
          </form>
      )
    }
}
export default MessageForm
