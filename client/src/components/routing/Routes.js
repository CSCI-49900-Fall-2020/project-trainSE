import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Register from "../auth/Register";
import AlertMsg from "../layout/AlertMsg";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routing/PrivateRoutes";
import Repository from "../pages/Repository";
import ThreadPage from "../pages/ThreadPage";
import ResourcePage from "../pages/ResourcePage";

const repository = ["python", "c++", "java"];

const Routes = () => {
  return (
    <section className="container">
      <AlertMsg />
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/repository/:topic" exact component={Repository} />
        <PrivateRoute
          path="/repository/:topic/thread/:listThread"
          exact
          component={ThreadPage}
        />
        <PrivateRoute
          path="/repository/:topic/thread/:listThread/resource"
          exact
          component={ResourcePage}
        />
      </Switch>
      {/*just for testing */}
      {/* <Route component={NotFound} /> */}
    </section>
  );
};

export default Routes;
