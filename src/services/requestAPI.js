import { getStorage } from './localStorage';

export const requestTokenAPI = async () => {
  try {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
};

export const fetchGame = async (
  token,
  // category = getStorage('category') || '',
  // difficulty = '',
  // type = '',
) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const URL = 'https://opentdb.com/api_category.php';
    const response = await fetch(URL);
    const { trivia_categories: categories } = await response.json();
    return categories;
  } catch (error) {
    return error;
  }
};
