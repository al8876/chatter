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
        text: 'this is a test',
        user: 'bob',
        date: 'Tue, 20 Feb 2018 03:40:26 GMT'
      }, {
        id: 3,
        type: 'system',
        text: 'Anonymous changed name to Susan',
      }, {
        id: 4,
        type: 'user',
        text: 'hot dog',
        user: 'susan',
        date: 'Tue, 20 Feb 2018 03:49:26 GMT'
      }]
    };
  }

    newMessage(messageText) {
    var dt = new Date();
    var utcDate = dt.toUTCString();
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      user: this.state.user,
      text: messageText,
      date: utcDate
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    });
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