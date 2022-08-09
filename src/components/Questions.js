import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestTokenAPI';
import Timer from './Timer';

class Questions extends Component {
  state = {
    gameCategory: '',
    gameQuestions: [],
    questionNumber: 0,
    answers: [],
    questionName: '',
    correctAnswer: '',
    btnIsDisable: false,
  };

  componentDidMount() {
    this.setGame();
  }

  setGame = async () => {
    const token = getStorage('token');
    const { history } = this.props;
    const { questionNumber } = this.state;
    const { results } = await fetchGame(token);
    if (results.length === 0) {
      history.push('/');
      localStorage.clear();
    }
    const answers = this.setGameQuestions(results[questionNumber]);

    this.setState({
      gameQuestions: results,
      answers,
    }, () => {
      const { gameQuestions } = this.state;
      this.setState({
        gameCategory: gameQuestions[questionNumber].category,
        questionName: gameQuestions[questionNumber].question,
        correctAnswer: gameQuestions[questionNumber].correct_answer,
      });
    });
  };

  setGameQuestions = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const VALUE_BETWEEN = 0.5;
    const questions = [...incorrects, correct].sort(
      () => Math.random() - VALUE_BETWEEN,
    );

    return questions;
  };

  onTimeOut = () => {
    this.setState({ btnIsDisable: true });
  };

  render() {
    const {
      gameCategory,
      questionName,
      answers,
      correctAnswer,
      btnIsDisable,
    } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{gameCategory}</h2>
        <h4 data-testid="question-text">{questionName}</h4>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (answer === correctAnswer ? (
            <button
              key={ answer }
              type="button"
              disabled={ btnIsDisable }
              data-testid="correct-answer"
            >
              {answer}
            </button>
          ) : (
            <button
              key={ answer }
              type="button"
              disabled={ btnIsDisable }
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          )))}
        </div>
        { questionName !== '' && <Timer onTimeOut={ this.onTimeOut } /> }
      </div>
    );
  }
}

Questions.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default Questions;
