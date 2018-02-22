import React, {Component} from 'react';

class MessageList extends Component {
  render(){
    const messages = this.props.messages.map((message) => {

      let divStyle = {
        color: message.color
      };
      
      if (message.type === 'incomingMessage') {
        return (
          <div key={message.id} className='message'>
            <span className='message-username' style={divStyle}>{message.user}</span>
            <span className='message-content'>{message.text}</span>
            <span className='message-time'>{message.date}</span>
          </div>
        );
      } else if (message.type === 'incomingNotification'){
        return (
          <div key={message.id} className='message system'>
            {message.oldUser} has changed name to {message.user}
          </div>
        );
      }
    });

    return(
      <div className='messages'>
        {messages}
      </div>
    );
  }
}

export default MessageList;