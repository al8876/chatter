import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageText: '',
      userName: '',
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onUserNameTextChange(event) {
    this.setState({userName: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.messageText ==='') {
        console.log('error: no text input for message');
      } else if (this.state.userName === ''){
        this.props.newMessage(this.state.messageText, 'Anonymous User');
        this.setState({messageText: ''});
      } else {
        this.props.newMessage(this.state.messageText, this.state.userName);
        this.setState({messageText: '', userName: this.state.userName});
      }
    }
  }

  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className='chatbar'>
        <input
          value={this.state.userName}
          onChange={this.onUserNameTextChange.bind(this)}
          className='chatbar-username'
          placeholder='Your Name (Optional)' />
        <input 
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default Chatbar;