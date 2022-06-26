import React from "react";
import { useSelector } from "react-redux";
import MinViewPostField from "./MinViewPostField";
import MaxViewPostField from "./MaxViewPostField/MaxViewPostField";
import { AppState } from "../../services/redux";

const UserPostField = () => {
  const viewValue = useSelector(
    (state: AppState) => state.homePagePostFieldViewValue
  );

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
  } else {
    return <></>;
  }
};

export default UserPostField;
