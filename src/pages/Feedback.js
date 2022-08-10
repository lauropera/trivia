import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import Score from '../components/Score';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';
import getPicture from '../helpers/defaultPicture';

class Feedback extends Component {
  async componentDidMount() {
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
      localStorage.setItem('ranking', JSON.stringify(itemsSorted));
    }
  }

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

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
