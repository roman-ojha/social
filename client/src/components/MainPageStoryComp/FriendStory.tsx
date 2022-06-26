import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
// import { storyIndex } from "../../services/redux-actions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../services/redux";

const FriendStory = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { storyIndex } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <div className="Friends_Story_Container">
        <div
          onClick={() => {
            storyIndex(props.index);
            history.push("/u/stories");
          }}
          className="Friends_Story_Picutre_Container"
        >
          <img
            src={
              props.storiesInformation.picture
                ? props.storiesInformation.picture
                : User_Profile_Icon
            }
            alt=""
            className="Friend_Story_Picture"
          />
        </div>
        <div
          className="Friend_Story_Name"
          onClick={() => {
            storyIndex(props.index);
            history.push("/u/stories");
          }}
        >
          {props.storiesInformation.name.split(" ")[0]}
        </div>
      </div>
    </>
  );
};

export default FriendStory;
