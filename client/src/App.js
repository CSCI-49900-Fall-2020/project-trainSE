import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import Routes from "./components/routing/Routes";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";

// React router (helpful): https://rapidapi.com/blog/react-multi-page-app/

function App() {
  // On every render......
  // Call the loadUser() action creator which then relays to the USER_LOADED reducer
  // This ensures if the user is still logged in/authenticated on every request and render
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // Provider component globally "provides" the Redux store to all nested components
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            {/* Home page user sees when not logged in */}
            <Route path="/" exact component={Home} />
            {/* All other routes are modularized in the Routes component */}
            <Route component={Routes} />
          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
