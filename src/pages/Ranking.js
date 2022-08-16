import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import defaultPicture from '../helpers/defaultPicture';
import Header from '../components/Header';
import '../styles/Ranking.css';

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
        <Header hideScore />
        <div className="ranking-body">
          <button
            type="button"
            className="home-button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="ranking-list">
            {items.map((item, index) => (
              <div key={ item.name } className="ranking-list-card">
                <div>
                  <img
                    src={ item.picture }
                    alt={ `Avatar of ${item.name}` }
                    onError={ defaultPicture }
                  />
                </div>
                <p
                  data-testid={ `player-name-${index}` }
                  className="card-personal-name"
                >
                  {item.name}
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                  className="card-personal-score"
                >
                  {item.score}
                  {' '}
                  points
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default Ranking;
