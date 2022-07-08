import React from "react";
import { toastInfo } from "../../services/toast";
import { Button } from "@mui/material";

const DeleteProfile = () => {
  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toastInfo("Sorry!! this feature is not available right now");
  };
  return (
    <>
      <div className="Setting_Page_Delete_User_Profile_Container">
        <h1>Delete User Profile</h1>
        <p>
          NOTE : You can be able to recover after you delete your user profile
        </p>
        <Button onClick={deleteUser}>Delete Profile</Button>
      </div>
    </>
  );
};

export default DeleteProfile;
