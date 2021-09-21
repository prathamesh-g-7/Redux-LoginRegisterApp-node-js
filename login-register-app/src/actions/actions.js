import { LOGIN, REGISTER } from "./action-types";

export const register = (userDetails) => ({
  type: REGISTER,
  payload: userDetails,
});

export const login = (userDetails) => ({
  type: LOGIN,
  payload: userDetails,
});
