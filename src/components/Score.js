import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
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
