import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import AlertMsg from "../layout/AlertMsg";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routing/PrivateRoutes";

const Routes = () => {
  return (
    <section className="container">
      <AlertMsg />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
