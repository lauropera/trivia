import React from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer, resetPlayer } from '../redux/actions';
import { saveStorage } from '../services/localStorage';
import { requestTokenAPI } from '../services/requestAPI';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isSaveButtonDisabled: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.buttonChange());
  };

  buttonChange = () => {
    const { email, name } = this.state;
    const minValue = 3;
    const emailValidation = /\S+@\S+\.\S+/;
    const validation = emailValidation.test(email) && name.length >= minValue;
    // regex retirado de: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    this.setState({ isSaveButtonDisabled: !validation });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const token = await requestTokenAPI();
    const { resetPlayerDispatch, addPlayerDispatch, history } = this.props;
    resetPlayerDispatch();
    const { name, email } = this.state;
    addPlayerDispatch({ name, email });
    saveStorage('token', token);
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { isSaveButtonDisabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <form>
          <label htmlFor="input-email">
            Email
            <input
              name="email"
              id="input-email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="input-name">
            Name
            <input
              name="name"
              id="input-name"
              maxLength="38"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isSaveButtonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (state) => dispatch(addPlayer(state)),
  resetPlayerDispatch: () => dispatch(resetPlayer()),
});

Login.propTypes = {
  addPlayerDispatch: func.isRequired,
  history: shape({ push: func }).isRequired,
  resetPlayerDispatch: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
