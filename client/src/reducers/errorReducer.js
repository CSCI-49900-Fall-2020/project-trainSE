// import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// /* When action creators create an action (a JS object with a type and
//     payload), then that action gets dispatch to the store. The store
//     doesn't handle the action, but instead relays the action to the reducer with
//     information about the previousState and the action that was relayed to the reducer.

//     The reducer should return an updated store without mutating the previous state of the store
//     The new state is returned to the store and the store updates its global state and then
//     notifies the React UI components about the changes.
// */

// // Must provide an initial state if the store is new and empty
// const initialState = {
//   msg: {},
//   status: null,
//   id: null,
// };

// // The actual reducer function that will return new state depending on the action type
// export default function (state = initialState, action) {
//   // Destructure the type and payload properties from the action object
//   const { type, payload } = action;

//   // Using the action.type to switch on conditionals
//   switch (type) {
//     case GET_ERRORS:
//       return {
//         msg: payload.msg,
//         status: payload.status,
//         id: payload.id,
//       };

//     case CLEAR_ERRORS:
//       return {
//         msg: {},
//         status: null,
//         id: null,
//       };

//     default:
//       return state;
//   }
// }
