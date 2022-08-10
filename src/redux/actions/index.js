export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_CALC = 'ADD_CALC';
export const RESET_PLAYER = 'RESET_PLAYER';

export const addPlayer = (payload) => ({
  type: ADD_PLAYER,
  payload,
});

export const addCalc = (payload) => ({
  type: ADD_CALC,
  payload,
});

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});
