import { ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
}

export default user;
