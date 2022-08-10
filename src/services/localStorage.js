export const saveStorage = (key, item) => {
  localStorage.setItem(key, item);
};

export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};
