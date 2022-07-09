import React from "react";
import { Icon } from "@iconify/react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";

const AddStory = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const { setHomePagePostFieldViewValue } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <>
      <div
        className="Current_User_Story_Container"
        onClick={() => {
          setHomePagePostFieldViewValue("max");
          if (history.location.pathname !== "/u/home") {
            history.push("/u/home");
          }
        }}
      >
        <div className="Current_User_Story_Picure_Container">
          <Icon
            className="Current_User_Story_Add_Icon"
            icon="akar-icons:circle-plus"
            style={{ color: "white", height: "1.4rem" }}
          />
          <img
            src={
              userProfileDetailStore.picture === undefined
                ? User_Profile_Icon
                : userProfileDetailStore.picture
            }
            alt=""
            className="Current_User_Story_Picture"
          />
        </div>
        <p className="Current_User_Story_Name">Create</p>
      </div>
    </>
  );
};

export default AddStory;
