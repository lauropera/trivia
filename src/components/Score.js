import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div className="score-info">
        <p id="total-question" data-testid="feedback-total-question">
          { assertions }
          {' '}
          Questões Corretas
        </p>
        <p id="total-score" data-testid="feedback-total-score">
          { score }
          {' '}
          Pontuação Total
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Score.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Score);
