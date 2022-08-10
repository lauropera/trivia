import { func, shape } from 'prop-types';
import React, { Component } from 'react';

class PlayAgainButton extends Component {
  handlePlayAgainClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ this.handlePlayAgainClick }
      >
        Play Again
      </button>
    );
  }
}

PlayAgainButton.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default PlayAgainButton;
