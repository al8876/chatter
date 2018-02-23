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

  // Method to change messageText state to input value
  onMessageTextChange(event) {
    this.setState({
      messageText: event.target.value
    });
  }

  // Method to change temp state to input value
  onUserNameTextChange(event) {
    this.setState({
      temp: event.target.value
    });
  }

  // Method to check if current and old username match
  userNameMatch() {
    
    if (this.state.userName !== this.state.temp) {
      this.setState({
        oldUsername : this.state.userName,
        userName: this.state.temp
      });
    } 
  }

  // Method for default send to App.jsx - Contains messageText and userName
  defaultSend() {
    this.props.newMessage(this.state.messageText, this.state.userName);
  }

  // Method to check input fields and setState
  dataParser() {

    // Alert message if input is empty
    if (this.state.messageText ==='') {
      window.confirm('Cannot send empty message');

    // If state does not contain userName, place userName as Anonymous User
    } else if (this.state.userName === ''){
      this.props.newMessage(this.state.messageText, 'Anonymous User');
      this.setState({messageText: ''});

    // Send notification message of userName change if userName does not equal BLANK input - set userName to new input
    } else if(this.state.oldUsername !== this.state.userName && this.state.oldUsername === ''){
      this.props.newNotification(this.state.userName, 'Anonymous User');
      this.defaultSend();
      this.setState({messageText: '', userName: this.state.userName, oldUsername: this.state.userName});

    // Send notification message that user has changed userName
    } else if(this.state.oldUsername !== this.state.userName){
      this.props.newNotification(this.state.userName, this.state.oldUsername);
      this.defaultSend();
      this.setState({messageText: '', userName: this.state.userName, oldUsername: this.state.userName});
      
    // If userName = to previous message userName, send message
    } else if (this.state.userName === this.state.oldUsername){
      this.defaultSend();
      this.setState({messageText: ''});
    }

  }

  // Method on keypress to invoke dataParser
  onMessageKeyPress(event) {
    
    this.userNameMatch()
    if (event.key === 'Enter') {
      this.dataParser()
    }
  }

  // Method on click to invoke dataParser
  onButtonClick(event) {
    
    this.userNameMatch()
    this.dataParser()

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

        <button 
          className='chatbar-button'
          onClick={this.onButtonClick.bind(this)}>
          SEND IT 
          <i className="fas fa-paper-plane"></i>
        </button>

      </footer>
    );
  }
}

export default Chatbar;