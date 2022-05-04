import React from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Index from "./pages/Index/Index";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import GetUserIDPage from "./pages/GetUserIDPage";
import Page404 from "./pages/Page404";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainRoot = () => {
  const history = useHistory();
  history.push("/u");
  return <></>;
};

const App = () => {
  return (
    <>
      <ToastContainer limit={3} transition={Flip} />
      <Switch>
        <Route exact path="/" component={MainRoot} />
        <Route path="/u" component={Index} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/register" component={SignUpPage} />
        <Route exact path="/userid" component={GetUserIDPage} />
        <Route path="*" component={Page404} />
      </Switch>
    </>
  );
};

export default App;
