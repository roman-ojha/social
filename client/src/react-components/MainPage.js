import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  const getUserData = async () => {
    try {
      const res = await fetch("/u", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(await res.json());
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/signin");
    }
  };
  // const getUserData = async () => {
  //   try {
  //     const res = await fetch("/auth/login/success", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     console.log(await res.json());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <h1>Home page</h1>
    </>
  );
};

export default HomePage;
