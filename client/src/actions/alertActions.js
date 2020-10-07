import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

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

// setAlert action creator will create an action that provides info about the alert
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // Create a universally unique identifier as an id
  const id = uuidv4();

  // Dispatch an action with type SET_ALERT to the appropriate reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Dispatch an action with type REMOVE_ALERT and specify the id to delete that specific alert
  // Only dispatch after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
