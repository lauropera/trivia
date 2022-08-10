import React, { Component } from 'react';
import { func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestAPI';
import { addCalc } from '../redux/actions';
import Button from './Button';
import Loading from './Loading';
import '../styles/QuestionsStyle.css';

const NUMBER_TEN = 10;
const ONE_SECOND = 1000;
const TIMER_LIMIT = 0;
const INITIAL_STATE = {
  gameQuestions: [],
  gameCategory: '',
  questionName: '',
  questionNumber: 0,
  answers: [],
  correctAnswer: '',
  questionDifficulty: '',
  btnIsDisable: false,
  seconds: 30,
  click: false,
  isLoading: false,
};

class Questions extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setGame();
  }

  handleClick = ({ target }) => {
    const { name } = target;
    this.setState({ btnIsDisable: true, click: true }, () => {
      const { questionDifficulty } = this.state;
      if (name === 'correct') this.calculateScore(questionDifficulty);
      this.countDownTimer();
    });
  };

  validateQuestions = (questions) => {
    if (questions.length === 0) {
      this.redirectTo('/');
      localStorage.clear();
    }
  };

  redirectTo = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  setGame = async () => {
    this.setState({ isLoading: true });
    const { results } = await fetchGame(getStorage('token'));
    this.validateQuestions(results);
    this.setState({ gameQuestions: results });
    this.setNewQuestion();
    this.countDownTimer();
    this.setState({ isLoading: false });
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const MAX_QUESTIONS = 5;
    if (questionNumber === MAX_QUESTIONS - 1) this.redirectTo('/feedback');
    this.setState(
      (pastState) => ({
        questionNumber: pastState.questionNumber + 1,
        click: false,
      }),
      () => {
        this.setNewQuestion();
        clearInterval(this.timerId);
        this.setState({ seconds: 30, btnIsDisable: false });
      },
    );
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

  setGameAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: wrongs } = question;
    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const VALUE_BETWEEN = 0.5;
    return [...wrongs, correct].sort(() => Math.random() - VALUE_BETWEEN);
  };

  calculateScore = (difficulty) => {
    const { seconds } = this.state;
    const { score, addCalcDispatch } = this.props;
    const TEN = 10;
    const THREE = 3;
    if (difficulty === 'easy') addCalcDispatch(score + TEN + seconds * 1);
    if (difficulty === 'medium') addCalcDispatch(score + TEN + seconds * 2);
    if (difficulty === 'hard') addCalcDispatch(score + TEN + seconds * THREE);
  };

  countDownTimer = () => {
    this.timerId = setInterval(() => {
      const { seconds, click } = this.state;
      if (seconds === TIMER_LIMIT || click) {
        clearInterval(this.timerId);
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }, ONE_SECOND);
  };

  render() {
    const {
      gameCategory,
      questionName,
      answers,
      correctAnswer,
      btnIsDisable,
      click,
      questionDifficulty,
      seconds,
      isLoading,
    } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div>
          <h2 data-testid="question-category">{gameCategory}</h2>
          <h4 data-testid="question-text">{questionName}</h4>
          <h4>{`Difficulty: ${questionDifficulty}`}</h4>
          <div data-testid="answer-options">
            {answers.map((answer, index) => (answer === correctAnswer ? (
              <Button
                key={ answer }
                btnText={ answer }
                btnName="correct"
                btnClass={ click ? 'correct' : '' }
                btnDisabled={ btnIsDisable }
                btnDataId="correct-answer"
                btnClick={ this.handleClick }
              />
            ) : (
              <Button
                key={ answer }
                btnText={ answer }
                btnClass={ click ? 'wrong' : '' }
                btnDisabled={ btnIsDisable }
                btnDataId={ `wrong-answer-${index}` }
                btnClick={ this.handleClick }
              />
            )))}
          </div>
          {`Timer: 00:${seconds < NUMBER_TEN ? `0${seconds}` : seconds}`}
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
      )
    );
  }
}

Questions.propTypes = {
  history: shape({ push: func }).isRequired,
  addCalcDispatch: func.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({ score: state.player.score });

const mapDispatchToProps = (dispatch) => ({
  addCalcDispatch: (calc) => dispatch(addCalc(calc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
