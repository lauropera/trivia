import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { btnText, btnName, btnClass, btnDataId, btnDisabled, btnClick } = this.props;
    return (
      <button
        type="button"
        name={ btnName }
        disabled={ btnDisabled }
        className={ btnClass }
        data-testid={ btnDataId }
        onClick={ btnClick }
      >
        {btnText}
      </button>
    );
  }
}

Button.defaultProps = {
  btnText: '',
  btnName: '',
  btnClass: '',
  btnDataId: '',
  btnDisabled: false,
  btnClick: () => {},
};

Button.propTypes = {
  btnText: string,
  btnName: string,
  btnClass: string,
  btnDataId: string,
  btnDisabled: bool,
  btnClick: func,
};
