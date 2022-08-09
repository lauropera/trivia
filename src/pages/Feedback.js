import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMessage />
      </div>
    );
  }
}

export default Feedback;
