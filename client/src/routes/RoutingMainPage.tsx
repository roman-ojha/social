import React, { useEffect } from "react";
import GetUserID from "../pages/GetUserID";
import Page404 from "../pages/Page404";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Index from "../pages/Index";
import { Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
// import { bindActionCreators } from "redux";
// import {actionCreators} from '../services/redux';
// import {RootState} from '../services/redux/reducer';
// import { useDispatch, useSelector } from "react-redux";

const MainRoot = () => {
  const history = useHistory();
  history.push("/u/home");
  return <></>;
};
const RoutingMainPage = () => {
  // const state=useSelector((state:RootState)=>state.rootUserProfileDetailReducer);
  // const dispatch=useDispatch();
  // const {setRootUserProfileDetail} =bindActionCreators(actionCreators,dispatch);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === "/u") {
      history.push("/u/home");
    }
  }, [history, location.pathname]);
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainRoot} />
        <Route path="/u" component={Index} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/userid" component={GetUserID} />
        <Route path="*" component={Page404} />
      </Switch>
    </>
  );
};

export default RoutingMainPage;
