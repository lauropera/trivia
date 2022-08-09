import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import Score from '../components/Score';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <Score />
        <FeedbackMessage />
      </div>
    );
  }
}

export default Feedback;
