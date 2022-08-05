import React, { Component } from 'react';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
};

export default connect(mapStateToProps)(Header);
