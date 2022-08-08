import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Questions { ...this.props } />
      </>
    );
  }
}

export default Game;
