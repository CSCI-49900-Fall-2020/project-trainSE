import React from "react";
import { Route, Switch,useRouteMatch } from "react-router-dom";
import Register from "../auth/Register";
import AlertMsg from "../layout/AlertMsg";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routing/PrivateRoutes";
import Repository from "../pages/Repository";
import Thread from "../pages/Thread"

const repository= ['python','c++','java'];

const Routes = () => {
  return (
    <section className="container">
      <AlertMsg />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact  path='/dashboard/:repository' component={Repository} />    
        <PrivateRoute exact  path='/dashboard/repository/thread' component={Thread} />  {/*just for testing */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
