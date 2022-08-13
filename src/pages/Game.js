import React, { Component } from 'react';
import { func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestAPI';
import { addCalc } from '../redux/actions';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/QuestionsStyle.css';
import '../styles/Game.css';

const NUMBER_TEN = 10;
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

class Game extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setGame();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleClick = ({ target: { name } }) => {
    this.setState({ btnIsDisable: true, click: true }, () => {
      const { questionDifficulty } = this.state;
      if (name === 'correct') this.calculateScore(questionDifficulty);
      this.countDownTimer();
    });
  };

  redirectTo = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  setGame = async () => {
    this.setState({ isLoading: true });
    const ERROR_CODE = 3;
    const response = await fetchGame(getStorage('token'));
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      this.redirectTo('/');
    } else {
      this.setState({ gameQuestions: response.results });
      this.setNewQuestion();
      this.countDownTimer();
      this.setState({ isLoading: false });
    }
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const MAX_QUESTIONS = 5;
    if (questionNumber === MAX_QUESTIONS - 1) {
      this.redirectTo('/feedback');
    } else {
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
    }
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
    const ONE_SECOND = 1000;
    const TIMER_LIMIT = 0;
    this.timerId = setInterval(() => {
      const { seconds, click } = this.state;
      if (seconds === TIMER_LIMIT || click) {
        clearInterval(this.timerId);
        this.setState({ btnIsDisable: true, click: true });
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
      <main className="Game-Container">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <section className="Game">
            <div>
              <h3 data-testid="question-category">{gameCategory}</h3>
              <h1 data-testid="question-text">{questionName}</h1>
              <p>{`Difficulty: ${questionDifficulty}`}</p>
            </div>
            <div className="Answers-Container" data-testid="answer-options">
              {answers.map((answer, index) => (answer === correctAnswer ? (
                <button
                  key={ answer }
                  type="button"
                  name="correct"
                  className={ click ? 'correct' : '' }
                  disabled={ btnIsDisable }
                  data-testid="correct-answer"
                  onClick={ this.handleClick }
                >
                  {answer}
                </button>
              ) : (
                <button
                  key={ answer }
                  type="button"
                  className={ click ? 'wrong' : '' }
                  disabled={ btnIsDisable }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                >
                  {answer}
                </button>
              )))}
            </div>
            {`00:${seconds < NUMBER_TEN ? `0${seconds}` : seconds}`}
            {click && (
              <button
                type="button"
                name="next"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )}
          </section>
        )}
      </main>
    );
  }
}

Game.propTypes = {
  history: shape({ push: func }).isRequired,
  addCalcDispatch: func.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({ score: state.player.score });

const mapDispatchToProps = (dispatch) => ({
  addCalcDispatch: (calc) => dispatch(addCalc(calc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
