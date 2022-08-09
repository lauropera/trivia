import { func } from 'prop-types';
import React, { Component } from 'react';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const NUMBER_TEN = 10;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.timerFunc();
  }

  timerFunc = () => {
    this.intervalId = setInterval(() => {
      const { seconds } = this.state;
      const { onTimeOut, secondsUpdate } = this.props;
      secondsUpdate(seconds);
      if (seconds === TIME_LIMIT) {
        clearInterval(this.intervalId);
        onTimeOut();
      } else {
        this.setState(() => ({ seconds: seconds - 1 }));
      }
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <span>
        { `Timer: 00:${seconds < NUMBER_TEN ? `0${seconds}` : seconds}`}
      </span>
    );
  }
}

Timer.propTypes = {
  onTimeOut: func.isRequired,
  secondsUpdate: func.isRequired,
};

export default Timer;
