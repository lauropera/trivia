import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import defaultPicture from '../helpers/defaultPicture';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('ranking') || '[]');
    this.setState({ items });
  }

  render() {
    const { items } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={ item.name }>
                <td>
                  <img
                    style={ { width: '80px', height: '80px' } }
                    src={ item.picture }
                    alt={ `Avatar of ${item.name}` }
                    onError={ defaultPicture }
                  />
                </td>
                <td data-testid={ `player-name-${index}` }>{item.name}</td>
                <td data-testid={ `player-score-${index}` }>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default Ranking;
