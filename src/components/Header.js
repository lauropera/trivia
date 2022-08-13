import React, { Component } from 'react';
import { number, string } from 'prop-types';
// import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import getPicture from '../helpers/defaultPicture';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className="header-game">
        <div className="Score-Container">
          <p data-testid="header-score">{ score }</p>
        </div>
        <div className="Player-Container">
          <p data-testid="header-player-name">{ name }</p>
          <img
            src={ getPicture(name, email) }
            alt={ name }
            data-testid="header-profile-picture"
          />
        </div>
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
