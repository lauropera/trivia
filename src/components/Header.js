import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img src="" alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">Nome</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

export default Header;
