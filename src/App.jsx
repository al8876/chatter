import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Anonymous User',
      messages: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    this.socket = new WebSocket('ws://0.0.0.0:3001/');

    this.socket.onopen = (event) => {
      console.log('Connection open');
    };

    this.socket.onmessage = (event) => {
      console.log('New message being parsed: ', JSON.parse(event.data));
      console.log('The state of THIS: ', this.state)
      console.log('This is this.state.messages: ', this.state.messages)

      let data = JSON.parse(event.data);

      const newMessages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({
        messages: newMessages
      });
      
      // switch(data.type) {
      //   case 'incomingNotification':
      //     const newMessages = this.state.messages.concat(JSON.parse(event.data));
      //     this.setState({
      //       messages: newMessages
      //     });
      //     break;
      //   case "incomingMessage":
      //     this.setState({
      //       messages: newMessages
      //     });
      //   break;
      //   default:
      //     throw new Error('Unknown event type' + data.type);
      // }
    }
  }

  newMessage(messageText, userName) {

    let dt = new Date();
    let utcDate = dt.toUTCString();
    const newMessageObject = {
      id: undefined,
      type: 'postMessage',
      user: userName,
      text: messageText,
      date: utcDate
    };

    this.socket.send(JSON.stringify(newMessageObject));

  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <Chatbar newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;