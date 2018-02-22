import React, {Component} from 'react';

class MessageList extends Component {
  render(){
    console.log("Rendering <MessageList />");    
    const messages = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return (
          <div key={message.id} className='message'>
            <span className='message-username'>{message.user}</span>
            <span className='message-content'>{message.text}</span>
            <span className='message-time'>{message.date}</span>
          </div>
        );
      } else if (message.type === 'incomingNotification'){
        return (
          <div key={message.id} className='message system'>
            {message.text}
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