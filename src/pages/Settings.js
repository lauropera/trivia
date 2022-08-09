import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { saveStorage } from '../services/localStorage';
import { fetchCategories } from '../services/requestAPI';

class Settings extends Component {
  state = {
    categories: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    this.setState({ isLoading: true });
    this.setState({
      categories: await fetchCategories(),
      isLoading: false,
    });
  };

  setNewCategory = ({ target }) => {
    const { categories } = this.state;
    const { id } = categories.find(({ name }) => name === target.value);
    saveStorage(target.id, id);
  };

  render() {
    const { categories, isLoading } = this.state;
    return (
      <main>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section>
              <h2 data-testid="settings-title">Configurações</h2>
              <label htmlFor="category">
                Categoria
                <select onChange={ this.setNewCategory } id="category">
                  {categories.map(({ id, name }) => (
                    <option key={ id }>{name}</option>
                  ))}
                </select>
              </label>
            </section>
            <div>
              <Link to="/">Home</Link>
            </div>
          </>
        )}
      </main>
    );
  }
}

export default Settings;
