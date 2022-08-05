import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SettingsLogin extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </Link>
    );
  }
}
