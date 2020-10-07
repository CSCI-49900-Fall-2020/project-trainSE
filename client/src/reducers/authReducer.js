import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

/* When action creators create an action (a JS object with a type and
    payload), then that action gets dispatch to the store. The store
    doesn't handle the action, but instead relays the action to the reducer with
    information about the previousState and the action. The type on the action object is
    compared with every reducer to see where the action should be belong.

    The reducer should return an updated store without mutating the previous state of the store
    The new state is returned to the store and the store updates its global state and then
    notifies the React UI components about the changes.
*/

// Must provide an initial state if the store is new and empty
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

// The actual reducer function that will return new state depending on the action type
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    /* USER_LOADING is the point where we're trying to get the
    user from the backend and actually fetch the user */
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    // When the user is actually loaded
    // Probably this case is the most frequently used to check if we are logged in or not
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };

    // When register or login is successful, important to setToken to local storage
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };

    // When an error or logout occurs, empty out user credentials
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    // Last resort
    default:
      return state;
  }
}
