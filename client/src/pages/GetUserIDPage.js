import React, { useState, useEffect } from "react";
import User_profile_Icon from "../Images/User_profile_Icon.svg";
import LoadingSpinner from "../react-components/LoadingSpinner";
import { useHistory } from "react-router";
import { instance as axios } from "../services/axios";
import "../styles/pages/getUserIDPage.css";

const GetUserIDPage = (props) => {
  const [onLoadingSpinner, setOnLoadingSpinner] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const history = useHistory();
  const [userID, setUserID] = useState("");
  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");
  useEffect(() => {
    // if user is login for the first time then the userID will be undefined
    if (uid !== "undefined") {
      // and if user had already login then we can push route into homepage
      history.push("/u");
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
  }, []);
  console.log(userDetail);
  const submitDetail = async (e) => {
    try {
      setOnLoadingSpinner(true);
      const profile = document.getElementById("image-input").files[0];
      const data = new FormData();
      if (props.userDetail === undefined) {
        // if UserID page will be open using google authnetication
        // then user doesn't have a password and userDetail is not commit form the props
        data.append("email", userDetail.email);
        data.append("auth", "google");
        // we have to send 'password' as undefinded if user is login with google authntication to check in backend
      } else {
        data.append("email", props.userDetail.email);
        data.append("password", props.userDetail.password);
        data.append("auth", "social");
      }
      data.append("userID", userID);
      data.append("profile", profile);
      const res = await axios({
        method: "POST",
        url: "/u/userId",
        data: data,
        withCredentials: true,
      });
      const resData = await res.data;
      if (res.status !== 201) {
        console.log(resData);
      } else {
        console.log(resData);
        if (props.userDetail === undefined) {
          history.push("/");
        } else {
          history.push("/signin");
        }
      }
      setOnLoadingSpinner(false);
    } catch (err) {}
  };
  return (
    <>
      {onLoadingSpinner ? <LoadingSpinner /> : ""}
      <div className="GetUserIDPage_Container">
        <div className="GetUserIDPage_Form_Container">
          <h1 className="GetUserIDPage_Form_Title">Almost There...</h1>
          <p className="GetUserIDPage_Form_Explained_Paragraph">
            Please enter A name That Identify yourself in socail
          </p>
          <input
            className="GetUserIDPage_Name_Form_Field"
            type="text"
            placeholder="Name"
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
                document.querySelector(".GetUserIDPage_Form_Profile").src =
                  URL.createObjectURL(e.target.files[0]);
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
      </div>
    </>
  );
};

export default GetUserIDPage;
