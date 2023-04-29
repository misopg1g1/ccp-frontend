import {
  LOGIN_REQUEST,
  INIT_LOGIN,
  LOGOUT,
} from "../constants/actionTypes";

export const login = ({ credentials }) => ({
  type: LOGIN_REQUEST,
  credentials,
});
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const initLogin = () => ({ type: INIT_LOGIN });
