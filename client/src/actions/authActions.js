import axios from "axios";
import { setAlert } from "./alertActions"; // import setAlert action
// import { returnErrors } from "./errorActions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

/* Actions are JS object (not an actual action verb) with a:
  type property - helps to determine the type of action to be carried out. The
  type property helps to switch between conditionals in the reducer files
  payload - the data that needs to be transmitted

  Actions are created through action creators. Action creators are functions that
  return actions/the js object in a more modular manner. After the action creators return the
  action, the action gets dispatched to the store and the store relays that action to its
  appropriate reducer

  In a synchronous web app, when we call an action creator, we immediately return an action which
  instantly flows into the middleware and reducers. However, the vast majority of web apps need to
  fetch data through asynchronous channels (because when we call an action creator, we probably need to
  fetch some amount of data from an external source as the payload to dispatch). Only when that
  asynchronous request resolves can we actually create the action. Vanilla redux is not capable of this, so
  we use Redux Thunk for asynchronous action creators

  When using redux thunk, all the existing rules for action creators kind of go out the
  window. In vanilla redux, action creators are required to return an action/JS object. However,
  redux thunk requires we return a plain javascript function. So, a function that returns a
  function. The first parameter to the inner thunk function is the dispatch method (the same dispatch that
  is a method of the global redux store object).
  */

// loadUser action creator to check token and load the user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from localStorage
  if (localStorage.token) {
    // Set the auth token in the axios header
    // setAuthToken located in lutils/setAuthToken
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // ReturnErrors will resolve into an action/JS object
    // This action is dispatched to an error reducer with type GET_ERRORS
    // dispatch(returnErrors(err.response.data, err.response.status));
    // Also, dispatch an AUTH_ERROR to the appropriate reducer
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register action creator to register a user on the backend and set the token to global state
export const register = ({
  firstName,
  lastName,
  username,
  email,
  password,
  passwordCheck,
}) => async (dispatch) => {
  // Set up a config object to configure the POST request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // JSON.stringify turns/stringifies a JS object into JSON format
  const body = JSON.stringify({
    firstName,
    lastName,
    username,
    email,
    password,
    passwordCheck,
  });

  try {
    // POST request to /api/users
    // body is the data to be sent to the backend
    // config describes metadata headers
    const res = await axios.post("/api/users/register", body, config);

    // Dispatch an action of REGISTER_SUCCESS to its appropriate reducer
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // Access the errors property from the reponse.data object
    const errors = err.response.data.errors;
    // If errors exist
    if (errors) {
      // For each error
      // Use the message as a param for setAlert action creator
      // Return an object from the action creator to dispatch an action to its appropriate reducer
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    // Dispatch an action of type REGISTER_FAIL to its reducer
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User to authenticate an already registered user
export const login = (email, password) => async (dispatch) => {
  // Set up a config object to configure the POST request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // JSON.stringify turns/stringifies a JS object into JSON format
  const body = JSON.stringify({ email, password });

  try {
    // POST request to /api/auth/login
    // body is the JSON data to be sent to the backend
    // config describes metadata headers
    const res = await axios.post("/api/auth/login", body, config);

    // Dispatch an action of LOGIN_SUCCESS to its appropriate reducer
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // loadUser() action creator returns an action and dispatches it to the appropriate reducer of user loaded
    // loadUser() action creator is also present in this file
    dispatch(loadUser());
  } catch (err) {
    // Access the errors property from the reponse.data object
    const errors = err.response.data.errors;
    // If errors exist
    if (errors) {
      // For each error
      // Use the message as a param for setAlert action creator
      // Return an object from the action creator to dispatch an action to its appropriate reducer
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    // Dispatch an action of type LOGIN_FAIL to its reducer
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
