import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  profilePageDataAction,
  setRootUserProfileDataState,
  userPostResponseData,
  homePageUserPostFieldDataAction,
  showLoadingSpinner,
  setHomePagePostFieldViewValue,
} from "../../../services/redux-actions";
import User_Profile_Icon from "../../../assets/svg/User_profile_Icon.svg";
import { Picker } from "emoji-mart";
import { Icon } from "@iconify/react";
import Api from "../../../services/api/pages/homeApi";
import { toastError, toastSuccess, toastInfo } from "../../../services/toast";

const EmojiMart = () => {
  const dispatch = useDispatch();
  return (
    <>
      {homePageUserPostEmojiView ? (
        <div>
          <Picker
            set="facebook"
            onSelect={(emoji) => {
              dispatch(
                homePageUserPostFieldDataAction({
                  ...homePageUserPostFieldData,
                  content: homePageUserPostFieldData.content + emoji.native,
                })
              );
            }}
            title="Pick your emoji..."
            emoji="point_up"
            i18n={{
              categories: { search: "Result", recent: "Recents" },
              skintones: {
                2: "Light Skin Tone",
              },
            }}
            style={{ width: "300px" }}
            color="white"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EmojiMart;
