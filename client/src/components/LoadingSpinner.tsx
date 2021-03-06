import React from "react";
import "../styles/components/loadingSpinner.css";
import { useSelector } from "react-redux";
import { AppState } from "../services/redux";

const LoadingSpinner = () => {
  const showLoadingSpinnerState = useSelector(
    (state: AppState) => state.showLoadingSpinnerReducer
  );

  return (
    <>
      {showLoadingSpinnerState ? (
        <div className="HomePage_Post_Field_Response_Loading_Spinner_Container">
          <div className="HomePage_Post_Field_Response_Loading_Spinner"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoadingSpinner;
