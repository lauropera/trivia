export const requestTokenAPI = async () => {
  try {
    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
};

export const fetchGame = async (token) => {
  try {
    const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
