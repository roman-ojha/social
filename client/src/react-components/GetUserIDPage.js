import React, { useState } from "react";
import User_profile_Icon from "../Images/User_profile_Icon.svg";
import { useHistory } from "react-router";

const GetUserIDPage = (props) => {
  const history = useHistory();
  const [userID, setUserID] = useState("");
  const submitDetail = async (e) => {
    const profile = document.getElementById("image-input").files[0];
    const data = new FormData();
    data.append("email", props.userDetail.email);
    data.append("password", props.userDetail.password);
    data.append("userID", userID);
    data.append("profile", profile);
    const res = await fetch("/u/userId", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();
    if (res.status !== 201) {
      console.log(resData);
    } else {
      console.log(resData);
      history.push("/signin");
    }
  };
  return (
    <>
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
