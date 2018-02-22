import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">CHATTER</a>
        <h2>{this.props.activeUsers} users Online</h2>
      </nav>
    );
  }
}

export default Navbar;