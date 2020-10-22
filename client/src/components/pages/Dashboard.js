import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {Link, useRouteMatch, Switch, Route} from "react-router-dom";
// import { getCurrentProfile } from '../../actions/profile';

import Repository from "../pages/Repository";

const Dashboard = ({ auth: { user } }) => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Spinner />
      <h1 className="large text-primary">Welcome to the DashBoard!</h1>
      <div>
        <ul>
          <li>
          {/* <Link to="/dashboard/Python">Python</Link> */}
          <Link to={`${url}/python`}>Python</Link>
          
          </li>
          <li>
          {/* <Link to="/dashboard/C++">C++</Link> */}
          <Link to={`${url}/c++`}>C++</Link>
          </li>
          <li>
          <Link to={`${url}/java`}>Java</Link>
          </li>
          {/* routes */}
          <div>
          <Switch> 
            <Route path={`${path}/Python`} component={Repository} />
            <Route path={`${path}/C++`} component={Repository} />
            <Route path={`${path}/C++`} component={Repository} />
          </Switch>
        </div>
        </ul>
        
      </div>
    </>
  );
};

Dashboard.propTypes = {
  //   getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  //   profile: state.profile,
});

export default connect(mapStateToProps)(Dashboard);
