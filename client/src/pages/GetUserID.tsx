import React, { useState, useEffect } from "react";
import User_profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { useHistory } from "react-router";
import { instance as axios } from "../services/axios";
import "../styles/pages/getUserIDPage.css";
import { Helmet } from "react-helmet";
import { toastError, toastInfo, toastWarn } from "../services/toast";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { bindActionCreators } from "redux";
import { actionCreators } from "../services/redux";
import UserDocument from "../interface/userDocument";
import { AxiosError } from "axios";

interface GetUserIDProps {
  userDetail: UserDocument;
}

const GetUserID: React.FC<GetUserIDProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState<any>({});
  const history = useHistory();
  const [userID, setUserID] = useState("");
  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");
  const { showLoadingSpinner } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    // if user is login for the first time then the userID will be undefined
    if (uid !== "undefined") {
      // and if user had already login then we can push route into homepage
      history.push("/u/home");
    }
    if (uid === "undefined") {
      // if UserID page will be open using google authnetication
      // then we have to get user Detail to save userID of the user
      const getUserDetail = async () => {
        const res = await axios({
          method: "GET",
          url: "/u",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const data = await res.data;
        setUserDetail(data);
      };
      getUserDetail();
    }
  }, [history, uid]);
  const submitDetail = async (): Promise<void> => {
    try {
      showLoadingSpinner(true);
      const profilePictureList = (
        document.getElementById("image-input")! as HTMLInputElement
      ).files;
      let profilePicture: File | null;
      if (!profilePictureList) {
        profilePicture = null;
      } else {
        profilePicture = profilePictureList[0];
      }
      const data = new FormData();
      data.append("userID", userID);
      data.append("profile", profilePicture as Blob);
      const res = await axios({
        method: "POST",
        url: "/u/userId",
        data: data,
        withCredentials: true,
      });
      if (res.status !== 200) {
        // console.log(resData);
      } else {
        history.push("/u/home");
      }
      showLoadingSpinner(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.err);
        }
      } else {
        toastError("Some Problem Occur, Please Try again Letter!!!");
      }
      showLoadingSpinner(false);
    }
  };

  return (
    <>
      <LoadingSpinner />
      <main className="GetUserIDPage_Container">
        <Helmet>
          <title>userID/undefine</title>
        </Helmet>
        <div className="GetUserIDPage_Form_Container">
          <h1 className="GetUserIDPage_Form_Title">Almost There...</h1>
          <p className="GetUserIDPage_Form_Explained_Paragraph">
            Please enter a unique name That Identify yourself in social
          </p>
          <input
            className="GetUserIDPage_Name_Form_Field"
            type="text"
            placeholder="UserID"
            value={userID}
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
          <p className="GetUserIDPage_Form_Udate_Profile_Text">
            Update Your Profile Picture
          </p>
          <input
            id="image-input"
            type="file"
            style={{ visibility: "hidden", position: "absolute" }}
            onChange={(e) => {
              try {
                if (e.target.files !== null) {
                  (
                    document.querySelector(
                      ".GetUserIDPage_Form_Profile"
                    )! as HTMLInputElement
                  ).src = URL.createObjectURL(e.target.files[0]);
                }
              } catch (err) {}
            }}
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            name="image"
          />
          <label
            htmlFor="image-input"
            className="GetUserIDPage_Form_Update_Profile_Label"
          >
            <img
              className="GetUserIDPage_Form_Profile"
              src={User_profile_Icon}
              alt="profile"
            />
          </label>
          <button
            className="GetUserIDPage_Form_Submit_Button"
            onClick={submitDetail}
          >
            Submit
          </button>
        </div>
      </main>
    </>
  );
};

export default GetUserID;
