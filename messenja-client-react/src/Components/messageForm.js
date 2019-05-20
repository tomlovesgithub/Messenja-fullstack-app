import React, { Component } from 'react'

class MessageForm extends Component {

  componentDidUpdate() {
      this.props.inputElement.current.focus()
    }

  render() {
    return (
      <form onSubmit={this.props.putMessageToDB}>
      <textarea
        ref={this.props.inputElement}
        value={this.props.message}
        onChange={this.props.handleInput}
      />
      <br/>
      <button
      type="submit"
      onClick={this.props.transition}
      >
      SEND
      </button>
    </form>
    )
  }
}
export default MessageForm
