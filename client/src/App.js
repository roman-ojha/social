import React from "react";
import SignIn from "./react-components/SignIn";
import SignUp from "./react-components/SignUp";
import MainPage from "./react-components/MainPage";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={MainPage} />
      </Switch>
      {/* <SignIn />
      <SignUp /> */}
    </>
  );
};

export default App;
