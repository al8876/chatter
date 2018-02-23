import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
  
// Create new App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Anonymous User',
      messages: [],
      activeUsers: undefined,
      color: undefined,
      img: undefined
    };
  }

  // On page load - perform actions
  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/');

    // Import fontawesome script to body
    const script = document.createElement('script');
    script.src = "https://use.fontawesome.com/releases/v5.0.6/js/all.js";
    script.async = true;
    document.body.appendChild(script);

    this.socket.onopen = (event) => {
      console.log('Connection open');
    };

    // Function to sort incoming data into correct states
    this.socket.onmessage = (event) => {
      console.log('This is the event: ', event);
      let data = JSON.parse(event.data);
      console.log('This is parsed event: ', data);
      if (data['user']) {
        const newMessages = this.state.messages.concat(JSON.parse(event.data));
        this.setState({
          messages: newMessages
        });
      } else if (typeof data === 'string') {
        this.setState({
          color: data
        })
      } else {
        this.setState({
          activeUsers: data
        })
      }
    }
  }

  // Method to handle Notification type messages
  newNotification(userName, oldUserName) {
    const newNotificationObject = {
      id: undefined,
      type: 'postNotification',
      user: userName,
      oldUser: oldUserName
    };

    this.socket.send(JSON.stringify(newNotificationObject));

  }

  // Method to handle User Message type messages
  newMessage(messageText, userName) {

    let dt = new Date();
    let utcDate = dt.toUTCString();
    const newMessageObject = {
      id: undefined,
      type: 'postMessage',
      user: userName,
      text: messageText,
      date: utcDate,
      color: this.state.color,
      imgage: this.state.img
    };

    this.socket.send(JSON.stringify(newMessageObject));

  }

  render() {
    return (
      <div>
        <Navbar activeUsers={this.state.activeUsers}/>
        <MessageList messages={this.state.messages}/>
        <Chatbar newMessage={this.newMessage.bind(this)} newNotification={this.newNotification.bind(this)}/>
      </div>
    );
  }
}

export default App;