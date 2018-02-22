import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageText: '',
      temp: '',
      userName: '',
      oldUsername: '',
    
    };
  }

  onMessageTextChange(event) {
    this.setState({
      messageText: event.target.value
    });
  }

  onUserNameTextChange(event) {
    this.setState({
      temp: event.target.value
    });
  }

  onMessageKeyPress(event) {
    if(this.state.userName!==this.state.temp){
      this.setState({
        oldUsername : this.state.userName,
        userName: this.state.temp
      });
    } 
    if (event.key === 'Enter') {
      if (this.state.messageText ==='') {
        console.log('error: no text input for message');
      } else if (this.state.userName === ''){
        this.props.newMessage(this.state.messageText, 'Anonymous User');
        this.setState({messageText: ''});
      } else if(this.state.oldUsername !== this.state.userName && this.state.oldUsername === ''){
        this.props.newNotification(this.state.userName, 'Anonymous User');
        this.props.newMessage(this.state.messageText, this.state.userName);
        this.setState({messageText: '', userName: this.state.userName, oldUsername: this.state.userName});
      } else if(this.state.oldUsername !== this.state.userName){
        this.props.newNotification(this.state.userName, this.state.oldUsername);
        this.props.newMessage(this.state.messageText, this.state.userName);
        this.setState({messageText: '', userName: this.state.userName, oldUsername: this.state.userName});
      } else if (this.state.userName === this.state.oldUsername){
        this.props.newMessage(this.state.messageText, this.state.userName);
        this.setState({messageText: '', userName: this.state.userName});
      }
      
    }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input
          value={this.state.temp}
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