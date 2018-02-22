import React, {Component} from 'react';

class MessageList extends Component {
  render(){
    const messages = this.props.messages.map((message) => {

      let divStyle = {
        color: message.color
      };

      let imgStyle = {
        width: 300
      }
      
      if (message.type === 'incomingMessage') {

        let textContent = message.text;
        console.log('This is text content: ', textContent);
        let arrayOfText = textContent.split(' ');
        console.log('This is the split text: ', arrayOfText);
        let arrayNumber = arrayOfText.length - 1;
        console.log('Array number: ', arrayNumber);
        let endOfArray = arrayOfText[arrayNumber];
        console.log('This is the 4th spot in endOfArray: ', endOfArray);

        // Image Extension Variables
        let gif = 'gif';
        let png = 'png';
        let jpg = 'jpg';

        // If last text element ends with one of Image Extension Variables
        if (endOfArray.endsWith(gif) || endOfArray.endsWith(png) || endOfArray.endsWith(jpg)) {
          console.log('Last word includes the image extension');
          let imageLink = endOfArray;
          let removedPictureLink = 
          console.log('This is IMAGE LINK: ', imageLink);
          return (
            <div key={message.id} className='message'>
              <span className='message-username' style={divStyle}>{message.user}</span>
              <span className='message-content'>{message.text}<a href={imageLink}><img src={imageLink} style={imgStyle} className='img'/></a></span>
              <span className='message-time'>{message.date}</span>
            </div>
          );
        } else {
          console.log('Last word DID NOT include image extension');
          return (
            <div key={message.id} className='message'>
              <span className='message-username' style={divStyle}>{message.user}</span>
              <span className='message-content'>{message.text}</span>
              <span className='message-time'>{message.date}</span>
            </div>
          );
        };

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