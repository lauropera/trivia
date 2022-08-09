import { func, number, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestTokenAPI';
import Timer from './Timer';
import { addCalc } from '../redux/actions';
import '../styles/QuestionsStyle.css';

class Questions extends Component {
  state = {
    gameQuestions: [],
    gameCategory: '',
    questionName: '',
    questionNumber: 0,
    answers: [],
    correctAnswer: '',
    btnIsDisable: false,
    questionDifficulty: '',
    seconds: 30,
  };

  componentDidMount() {
    this.setGame();
  }

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const MAX_QUESTIONS = 4;
    if (questionNumber === MAX_QUESTIONS) this.redirectToFeedback();
    this.setState((pastState) => ({
      questionNumber: pastState.questionNumber + 1,
      click: false,
    }),
    () => this.setNewQuestion());
  }

  redirectToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  }

  setGame = async () => {
    const token = getStorage('token');
    const { results } = await fetchGame(token);
    this.validateQuestions(results);
    this.setState({ gameQuestions: results }, () => this.setNewQuestion());
  };

  setNewQuestion = () => {
    const { questionNumber, gameQuestions } = this.state;
    const answers = this.setGameAnswers(gameQuestions[questionNumber]);
    this.setState({
      questionDifficulty: gameQuestions[questionNumber].difficulty,
      gameCategory: gameQuestions[questionNumber].category,
      questionName: gameQuestions[questionNumber].question,
      correctAnswer: gameQuestions[questionNumber].correct_answer,
      answers,
    });
  };

  validateQuestions = (questions) => {
    const { history } = this.props;
    if (questions.length === 0) {
      history.push('/');
      localStorage.clear();
    }
  };

  secondsUpdate = (param) => this.setState({ seconds: param });

  setGameAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const VALUE_BETWEEN = 0.5;
    const questions = [...incorrects, correct].sort(
      () => Math.random() - VALUE_BETWEEN,
    );

    return questions;
  };

  onTimeOut = () => this.setState({ btnIsDisable: true });

  handleClick = (event) => {
    const { name } = event.target;
    this.setState({ click: true }, () => {
      const { questionDifficulty, seconds } = this.state;
      const ten = 10;
      const three = 3;
      const { score, addCalcDispatch } = this.props;
      if (name === 'correct') {
        switch (questionDifficulty) {
        case 'easy':
          addCalcDispatch(score + ten + (seconds * 1));
          break;
        case 'medium':
          addCalcDispatch(score + ten + (seconds * 2));
          break;
        case 'hard':
          addCalcDispatch(score + ten + (seconds * three));
          break;
        default:
          return questionDifficulty;
        }
      }
    });
  }

  render() {
    const {
      gameCategory,
      questionName,
      answers,
      correctAnswer,
      btnIsDisable,
      click,
      questionDifficulty,
    } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{gameCategory}</h2>
        <h4 data-testid="question-text">{questionName}</h4>
        <h4>{questionDifficulty}</h4>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (answer === correctAnswer ? (
            <button
              key={ answer }
              name="correct"
              type="button"
              disabled={ btnIsDisable }
              data-testid="correct-answer"
              onClick={ this.handleClick }
              className={ click ? 'correct' : '' }
            >
              {answer}
            </button>
          ) : (
            <button
              key={ answer }
              onClick={ this.handleClick }
              type="button"
              disabled={ btnIsDisable }
              data-testid={ `wrong-answer-${index}` }
              className={ click ? 'wrong' : '' }
            >
              {answer}
            </button>
          )))}
        </div>
        { questionName !== '' && <Timer
          onTimeOut={ this.onTimeOut }
          secondsUpdate={ this.secondsUpdate }
        /> }
        {click && (
          <button
            name="next"
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  addCalcDispatch: func.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  addCalcDispatch: (calc) => dispatch(addCalc(calc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
