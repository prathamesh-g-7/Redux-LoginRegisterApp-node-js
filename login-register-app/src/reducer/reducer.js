import { LOGIN, REGISTER } from "../actions/action-types";

export const initialState = [
  {
    user: null,
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log("action", action);

  switch (action.type) {
    case REGISTER:
      return [...state, state.push(action.payload)];

    case LOGIN:
      return [...state, action.payload];
    default:
      return state;
  }
};
