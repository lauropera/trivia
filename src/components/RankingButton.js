import React, { Component } from 'react';
import { shape, func } from 'prop-types';

class RankingButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => { history.push('./ranking'); } }
      >
        Ranking
      </button>
    );
  }
}

RankingButton.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default RankingButton;
