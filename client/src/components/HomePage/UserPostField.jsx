import React from "react";
import { useSelector } from "react-redux";
import MinViewPostField from "./MinViewPostField";
import MaxViewPostField from "./MaxViewPostField";

const UserPostField = () => {
  const viewValue = useSelector((state) => state.homePagePostFieldViewValue);

  if (viewValue === "min") {
    return (
      <>
        <MinViewPostField />
      </>
    );
  } else if (viewValue === "max") {
    return (
      <>
        <MaxViewPostField />
      </>
    );
  }
};

export default UserPostField;
