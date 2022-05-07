import React from "react";
import "../styles/components/moreProfileBox.css";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { NavLink, useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { startProgressBar, stopProgressBar } from "../services/redux-actions";
import { instance as axios } from "../services/axios";
import { toastInfo } from "../services/toast";

const MoreProfileBox = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  const date = new Date();
  const userLogOut = async () => {
    try {
      dispatch(startProgressBar());
      const res = await axios({
        method: "GET",
        url: "/u/logout",
        header: {
          Accpet: "application/josn",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(stopProgressBar());
      history.push("/signin", { replace: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      dispatch(stopProgressBar());
    }
  };
  return (
    <>
      {moreProfileBoxState ? (
        <div className="More_Profile_Box_Container">
          <NavLink
            to={`/u/profile/${userProfileDetailStore.userID}`}
            className="More_Profile_Box_User_Info"
          >
            <img
              src={
                userProfileDetailStore.picture
                  ? userProfileDetailStore.picture
                  : User_Profile_Icon
              }
              alt="user"
            />
            <p>Roman Ojha</p>
          </NavLink>
          <NavLink to="/u/setting" className="More_Profile_Box_Setting">
            <Icon
              icon="ant-design:setting-filled"
              className="More_Profile_Box_Icon"
            />
            <p>Setting</p>
          </NavLink>
          <div
            className="More_Profile_Box_Help"
            onClick={() => {
              toastInfo("Helping...");
            }}
          >
            <Icon icon="bxs:help-circle" className="More_Profile_Box_Icon" />
            <p>Help</p>
          </div>
          <div className="More_Profile_Box_logout" onClick={userLogOut}>
            <Icon icon="majesticons:logout" className="More_Profile_Box_Icon" />
            <p>Log Out</p>
          </div>
          <div className="More_Profile_Box_App_Info">
            <p
              onClick={() => {
                toastInfo(`Social ©️ ${date.getFullYear()}`);
              }}
            >
              Social &copy; {date.getFullYear()}
            </p>
            <Icon
              icon="akar-icons:github-fill"
              className="More_Profile_Box_Github_Icon"
              onClick={() => {
                window.open("https://github.com/Roman-Ojha/Social", "_blank");
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MoreProfileBox;
