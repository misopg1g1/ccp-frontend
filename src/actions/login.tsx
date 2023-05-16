import {
  LOGIN_REQUEST,
  LOGOUT,
} from "../constants/actionTypes";

export const login = ({ credentials }: { credentials: any }) => ({
  type: LOGIN_REQUEST,
  credentials,
});
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
