import React from "react";
import { Helmet } from "react-helmet";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import constant from "../../constant/constant";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../services/redux";
import useRootUserProfilePageData from "../../hooks/useRootUserProfilePageData";

const MinViewPostField = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    profilePageDataAction,
    setRootUserProfileDataState,
    setHomePagePostFieldViewValue,
  } = bindActionCreators(actionCreators, dispatch);
  const setRootUserProfilePageData = useRootUserProfilePageData();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const homePageUserPostFieldData = useSelector((state: AppState) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );

  return (
    <>
      <div className="HomePage_MinView_UserPost_Field_Container">
        <Helmet>
          <title>{constant.applicationName}</title>
        </Helmet>
        <img
          src={
            userProfileDetailStore.picture === undefined
              ? User_Profile_Icon
              : userProfileDetailStore.picture
          }
          className="HomePage_MinField_UserPost_Field_Image"
          onClick={() => {
            setRootUserProfilePageData({
              rootUserProfileDetail: userProfileDetailStore,
            });
            history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
          }}
          alt="profile"
        />
        <input
          className="HomePage_MinView_UserPost_Input_Field"
          type="text"
          placeholder="Post Your Thought...."
          value={homePageUserPostFieldData.content}
          onChange={() => {}}
          onClick={() => {
            setHomePagePostFieldViewValue("max");
          }}
        />
      </div>
    </>
  );
};

export default MinViewPostField;
