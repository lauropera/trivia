import React, { Component } from 'react';

class Score extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-total-question">0</p>
        <p data-testid="feedback-total-score">0</p>
      </div>
    );
  }
}

export default Score;
