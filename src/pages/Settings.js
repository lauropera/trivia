import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStorage, saveStorage } from '../services/localStorage';
import { fetchCategories } from '../services/requestAPI';
import Loading from '../components/Loading';

class Settings extends Component {
  constructor() {
    super();
    if (!getStorage('options')) {
      saveStorage('options', JSON.stringify({
        category: 'Any category',
        difficulty: 'Any difficulty',
        type: 'Any Type',
      }));
    }
    this.state = {
      category: JSON.parse(getStorage('options')).category,
      difficulty: JSON.parse(getStorage('options')).difficulty,
      // type: JSON.parse(getStorage('options').type),
      categories: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    this.setState(
      {
        categories: await fetchCategories(),
      },
      () => {
        const { categories, category } = this.state;
        const categoryName = typeof category === 'string'
          ? ''
          : categories.find(({ id }) => id === category).name;
        this.setState({
          category: categoryName || '',
          isLoading: false,
        });
      },
    );
  };

  setNewOption = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.name === 'category' && !target.value.includes('Any')) {
      const { categories } = this.state;
      const { id } = categories.find(({ name }) => name === target.value);
      this.saveOption(target.name, id);
    } else {
      this.saveOption(target.name, target.value);
    }
  };

  saveOption = (name, value) => {
    saveStorage(
      'options',
      JSON.stringify({
        ...JSON.parse(getStorage('options')),
        [name]: value,
      }),
    );
  };

  render() {
    const { category, difficulty, categories, isLoading } = this.state;
    return (
      <main>
        <h2 data-testid="settings-title">Settings</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <form>
              <label htmlFor="category">
                Category
                <select
                  onChange={ this.setNewOption }
                  value={ category }
                  name="category"
                  id="category"
                >
                  <option>Any Category</option>
                  {categories.map(({ id, name }) => (
                    <option key={ id }>{name}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="difficulty">
                Difficulty
                <select
                  onChange={ this.setNewOption }
                  value={ difficulty }
                  name="difficulty"
                  id="difficulty"
                >
                  <option id="any">Any difficulty</option>
                  <option id="easy">Easy</option>
                  <option id="medium">Medium</option>
                  <option id="hard">Hard</option>
                </select>
              </label>
            </form>
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
