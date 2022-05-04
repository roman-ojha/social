import React from "react";
import GetUserID from "../pages/GetUserID";
import Page404 from "../pages/Page404";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Index from "../pages/Index";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

const MainRoot = () => {
  const history = useHistory();
  history.push("/u");
  return <></>;
};
const RoutingMainPage = () => {
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
