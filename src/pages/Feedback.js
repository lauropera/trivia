import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import Score from '../components/Score';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <Score />
        <FeedbackMessage />
        <PlayAgainButton { ...this.props } />
        <RankingButton { ...this.props } />
      </div>
    );
  }
}

export default Feedback;
