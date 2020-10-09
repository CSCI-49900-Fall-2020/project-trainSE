import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

/* When action creators create an action (a JS object with a type and
    payload), then that action gets dispatch to the store. The store
    doesn't handle the action, but instead relays the action to the reducer with
    information about the previousState and the action. The type on the action object is
    compared with every reducer to see where the action should be belong.

    The reducer should return an updated store without mutating the previous state of the store
    The new state is returned to the store and the store updates its global state and then
    notifies the React UI components about the changes.
*/

// Must provide an initial state if the store is new or empty
const initialState = [];

// The reducer function that will update the state of alerts
// Returns new state to the store depending on the action type
export default function (state = initialState, action) {
  // Destructure the type and payload properties from the action object
  const { type, payload } = action;

  // Recall this is the payload: { msg, alertType, id}

  switch (type) {
    case SET_ALERT:
      // Return the previous state in addition to the payload object
      return [...state, payload];
    case REMOVE_ALERT:
      // Return the new state of a filtered array
      // The filtered array must return elements whose id does not equal to the payload's id
      // This effectively filters out the alert we want to remove from the array
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
