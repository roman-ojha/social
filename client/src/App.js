import React from "react";
import SignIn from "./react-components/SignIn";
import SignUp from "./react-components/SignUp";
import MainPage from "./react-components/MainPage";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

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
      </Switch>
    </>
  );
};

export default App;
