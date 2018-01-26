import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';

const initialState = {
  number: 0,
};

export function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, number: state.number + 1 };
    default:
      return state;

  }
}