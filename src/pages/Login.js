import React from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../redux/actions';
import { saveStorage } from '../services/localStorage';
import Button from '../components/Button';
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
    const { name, email } = this.state;
    const { addPlayerDispatch, history } = this.props;
    addPlayerDispatch({ name, email });
    const token = await requestTokenAPI();
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
          <label htmlFor="input-gravatar-email">
            Email
            <input
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="input-name">
            Name
            <input
              name="name"
              id="input-name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <Button
            btnText="Play"
            btnDataId="btn-play"
            btnDisabled={ isSaveButtonDisabled }
            btnClick={ this.handleClick }
          />
        </form>
        <Button
          btnText="Configurações"
          btnDataId="btn-settings"
          btnClick={ () => history.push('/settings') }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (state) => dispatch(addPlayer(state)),
});

Login.propTypes = {
  addPlayerDispatch: func.isRequired,
  history: shape({ push: func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
