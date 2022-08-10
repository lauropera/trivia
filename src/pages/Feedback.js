import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape, string } from 'prop-types';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import Score from '../components/Score';
import getPicture from '../helpers/defaultPicture';
import Button from '../components/Button';

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
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Score />
        <FeedbackMessage />
        <Button
          btnText="Play Again"
          btnClick={ () => history.push('/') }
          btnDataId="btn-play-again"
        />
        <Button
          btnText="Ranking"
          btnClick={ () => history.push('/ranking') }
          btnDataId="btn-ranking"
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  name: string.isRequired,
  score: number.isRequired,
  gravatarEmail: string.isRequired,
  history: shape({ push: func }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
