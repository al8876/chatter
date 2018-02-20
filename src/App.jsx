import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Anon',
      messages: [{
        id: 1,
        type: 'system',
        text: 'Anonymous changed name to Bob',
      }, {
        id: 2,
        type: 'user',
        text: 'Has anyone seen my marbles?',
        user: 'bob',
        date: 'Tue, 20 Feb 2018 03:40:26 GMT'
      }, {
        id: 3,
        type: 'system',
        text: 'Anonymous changed name to Susan',
      }, {
        id: 4,
        type: 'user',
        text: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        user: 'susan',
        date: 'Tue, 20 Feb 2018 03:49:26 GMT'
      }]
    };
  }

  newMessage(messageText, userName) {
    var dt = new Date();
    var utcDate = dt.toUTCString();
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      user: userName,
      text: messageText,
      date: utcDate
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 5, type: 'user', user: 'Michelle', text: 'Litty Kitty', date: new Date().toUTCString()};
      const messages = this.state.messages.concat(newMessage);
      console.log('Set State here!');
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 5000);

    this.socket = new WebSocket('ws://0.0.0.0:3001/');

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