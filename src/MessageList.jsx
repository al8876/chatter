import React, {Component} from 'react';

class Loader extends Component {
  render() {
    return (
      <div>
        <div className="loader"></div>
      </div>
    )
  }
}

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  // Simulate loading
  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false})
    }, 3000);
  }

  render(){
    
    if (this.state.loading) {
      return <Loader/>;
    } else {
      const messages = this.props.messages.map((message) => {

        // Style for username color
        let divStyle = {
          color: message.color
        };
        
        if (message.type === 'incomingMessage') {

          // Convert incoming message text into an array
          let arrayOfText = message.text.split(' ');

          // Find the last value of the message text array
          let endOfArray = arrayOfText[arrayOfText.length -1];

          // Image Extension Variables
          let gif = 'gif';
          let png = 'png';
          let jpg = 'jpg';

          // If last text element ends with one of Image Extension Variables
          if (endOfArray.endsWith(gif) || endOfArray.endsWith(png) || endOfArray.endsWith(jpg)) {

            // Variable to remove link from text
            let sliceArray = arrayOfText.slice(0, -1)

            // Message without the image URL attached
            let renderMessage = sliceArray.join(' ');

            return (
              <div key={message.id} className='message userMessage'>
                <span className='message-username' style={divStyle}>{message.user}</span>
                <span className='message-content'>
                  {renderMessage}
                  <a href={endOfArray}><img src={endOfArray} className='img'/></a>
                </span>
                <span className='message-time'>{message.date}</span>
              </div>
            );
          
          // Else return without image tag in message-content
          } else {

            return (
              <div key={message.id} className='message userMessage'>
                <span className='message-username' style={divStyle}>{message.user}</span>
                <span className='message-content'>{message.text}</span>
                <span className='message-time'>{message.date}</span>
              </div>
            );
          };

        // If message is of type 'incomingNotification' then italicize and display different
        } else if (message.type === 'incomingNotification'){
          if (message.log === 'in') {
            return (
              <div key={message.id} className='message system'>
                A new user has logged in
              </div>);
          } else if (message.log === 'out') {
            return (
              <div key={message.id} className='message system'>
                A user has has logged out
              </div>);
          } else {
            return (
              <div key={message.id} className='message system'>
                {message.oldUser} has changed name to {message.user}
              </div>
            );
          }
        }
      });

      return(
        <div className='messages'>
          {messages}
        </div>
      );
    }
  }
}

export default MessageList;