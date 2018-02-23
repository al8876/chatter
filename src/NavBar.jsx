import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    let activeUsers = this.props.activeUsers;
    if (activeUsers === 1) {
      let users = ' Lonely Chatter Online';
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">CHATTER</a>
          <h2>{this.props.activeUsers}{users}</h2>
        </nav>
      );
    } else {
      let users = ' Chatters Online';
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">CHATTER</a>
          <h2>{this.props.activeUsers}{users}</h2>
        </nav>
      );
    }
  }
}

export default Navbar;