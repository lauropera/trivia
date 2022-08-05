import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../redux/actions';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isSaveButtonDisabled: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.buttonChange());
  }

  buttonChange = () => {
    const { email, name } = this.state;
    const minValue = 3;
    const emailValidation = /\S+@\S+\.\S+/;
    // regex retirado de: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (emailValidation.test(email) && name.length >= minValue) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  handleClick = (event) => {
    const { name, email } = this.state;
    event.preventDefault();
    const { addPlayerDispatch } = this.props;
    addPlayerDispatch({ name, email });
  }

  render() {
    const {
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </header>
        </div>
        Login
        <label htmlFor="input-gravatar-email">
          Email
          <input
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="input-player-name">
          Name
          <input
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          data-testid="btn-play"
          onClick={ this.handleClick }
          type="submit"
          disabled={ isSaveButtonDisabled }
        >
          {' '}
          Play
          {' '}

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (state) => dispatch(addPlayer(state)),
});

Login.propTypes = {
  addPlayerDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
