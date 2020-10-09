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
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={Routes} />
            {/* <Route path="/register" exact component={Register} /> */}
          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
