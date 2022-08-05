const requestTokenAPI = async () => {
  try {
    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
};

export default requestTokenAPI;
