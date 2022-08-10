import React, { Component } from 'react';
import { number, string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className="header-game">
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);
