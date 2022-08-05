import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import requestTokenAPI from '../services/requestTokenAPI';
import { saveStorage } from '../services/localStorage';

class PlayButton extends Component {
  onClickButton = async () => {
    const { history: { push } } = this.props;
    const token = await requestTokenAPI();
    saveStorage('tokenPlayer', token);
    push('/game');
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.onClickButton }
      >
        Jogar!
      </button>
    );
  }
}

PlayButton.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default PlayButton;
