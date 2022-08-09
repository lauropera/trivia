import React, { Component } from 'react';
import { func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestAPI';
import { addCalc } from '../redux/actions';
import Button from './Button';
import Timer from './Timer';
import '../styles/QuestionsStyle.css';

class Questions extends Component {
  state = {
    gameQuestions: [],
    gameCategory: '',
    questionName: '',
    questionNumber: 0,
    questionDifficulty: '',
    answers: [],
    correctAnswer: '',
    btnIsDisable: false,
    seconds: 30,
  };

  componentDidMount() {
    this.setGame();
  }

  handleClick = ({ target }) => {
    const { name } = target;
    this.setState({ click: true }, () => {
      const { questionDifficulty } = this.state;
      if (name === 'correct') this.calculateScore(questionDifficulty);
    });
  };

  validateQuestions = (questions) => {
    const { history } = this.props;
    if (questions.length === 0) {
      history.push('/');
      localStorage.clear();
    }
  };

  redirectToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  setGame = async () => {
    const token = getStorage('token');
    const { results } = await fetchGame(token);
    this.validateQuestions(results);
    this.setState({ gameQuestions: results }, () => this.setNewQuestion());
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const MAX_QUESTIONS = 5;
    if (questionNumber === MAX_QUESTIONS - 1) this.redirectToFeedback();
    this.setState(
      (pastState) => ({
        questionNumber: pastState.questionNumber + 1,
        click: false,
      }),
      () => this.setNewQuestion(),
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

  secondsUpdate = (param) => this.setState({ seconds: param });

  onTimeOut = () => this.setState({ btnIsDisable: true });

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
        {questionName !== '' && (
          <Timer
            onTimeOut={ this.onTimeOut }
            secondsUpdate={ this.secondsUpdate }
          />
        )}
        {click && (
          <Button
            btnText="Next"
            btnName="next"
            btnDataId="btn-next"
            btnClick={ this.nextQuestion }
          />
        )}
      </div>
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
