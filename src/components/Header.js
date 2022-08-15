import React, { Component } from 'react';
import { bool, number, string } from 'prop-types';
// import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import getPicture from '../helpers/defaultPicture';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, name, score, hideScore } = this.props;
    return (
      <header className={ !hideScore ? 'header-game' : 'header-game-noscore' }>
        {!hideScore && (
          <div className="Score-Container">
            <p data-testid="header-score">{score}</p>
          </div>
        )}
        <div className="Player-Container">
          <p data-testid="header-player-name">{name}</p>
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

Header.defaultProps = {
  email: '',
  name: '',
  score: 0,
  hideScore: false,
};

Header.propTypes = {
  email: string,
  name: string,
  score: number,
  hideScore: bool,
};

export default connect(mapStateToProps)(Header);
