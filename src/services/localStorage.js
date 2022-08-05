export const saveStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};
