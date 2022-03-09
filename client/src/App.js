import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import GetUserIDPage from "./react-components/GetUserIDPage";

const MainRoot = () => {
  const history = useHistory();
  history.push("/u");
  return <></>;
};

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainRoot} />
        <Route path="/u" component={MainPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route path="/userid" component={GetUserIDPage} />
      </Switch>
    </>
  );
};

export default App;
