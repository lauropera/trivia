import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape, string } from 'prop-types';
import { resetPlayer } from '../redux/actions';
import getPicture from '../helpers/defaultPicture';
import Header from '../components/Header';
import Score from '../components/Score';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends Component {
  componentDidMount() {
    this.saveUserScore();
  }

  saveUserScore = () => {
    const { name, score, gravatarEmail } = this.props;
    const picture = getPicture(name, gravatarEmail);
    const data = {
      name,
      score,
      picture,
    };
    if (name) {
      const items = JSON.parse(localStorage.getItem('ranking') || '[]');
      const itemsSorted = items.concat(data).sort((a, b) => b.score - a.score);
      console.log();
      localStorage.setItem('ranking', JSON.stringify(itemsSorted));
    }
  };

  handleClick = (route) => {
    const { history, resetPlayerDispatch } = this.props;
    if (route === '/') resetPlayerDispatch();
    history.push(route);
  };

  render() {
    return (
      <div>
        <Header hideScore />
        <Score />
        <FeedbackMessage />
        <button
          type="button"
          onClick={ () => this.handleClick('/') }
          data-testid="btn-play-again"
        >
          Play again
        </button>
        <button
          type="button"
          onClick={ () => this.handleClick('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerDispatch: () => dispatch(resetPlayer()),
});

Feedback.propTypes = {
  name: string.isRequired,
  score: number.isRequired,
  gravatarEmail: string.isRequired,
  history: shape({ push: func }).isRequired,
  resetPlayerDispatch: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
