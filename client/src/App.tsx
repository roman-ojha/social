import React from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutingMainPage from "./routes/RoutingMainPage";

const App = () => {
  return (
    <>
      <ToastContainer limit={3} transition={Flip} />
      <RoutingMainPage />
    </>
  );
};

export default App;
