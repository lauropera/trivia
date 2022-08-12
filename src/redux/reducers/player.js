import { ADD_PLAYER, ADD_CALC, RESET_OLD_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_CALC:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_OLD_PLAYER:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
}

export default player;
