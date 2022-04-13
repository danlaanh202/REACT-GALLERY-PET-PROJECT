import React, { useReducer } from "react";

export const initialState = {
  username: "",
  email: "",
  token: "",
  isAdmin: false,
  //   userDetails: "" || user,
  //   token: "" || token,
  //   loading: false,
  //   errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        username: action.payload.username,
        token: action.payload.accessToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        username: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
