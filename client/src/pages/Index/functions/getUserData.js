import {
  userProfileDetailAction,
  userProfilePostAction,
  followedUserPostDataAction,
  userSuggestionAction,
  followedByUserAction,
  setUserStories,
  messageListAction,
} from "../../../redux-actions/index";
import socket from "../../../services/socket";
import Api from "../../../services/api/pages/index";

const getUserData = async (dispatch, history, setRenderMainPage) => {
  try {
    const res = await Api.index();
    const userData = await res.data;
    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }
    if (!userData.userProfileDetail.userID) {
      history.push("/userid?uid=undefined");
    } else {
      dispatch(userProfileDetailAction(userData.userProfileDetail));
      dispatch(userProfilePostAction(userData.userProfileDetail.posts));
      dispatch(followedUserPostDataAction(userData.followedUserPost));
      dispatch(userSuggestionAction(userData.userSuggestion));
      dispatch(followedByUserAction(userData.followedBy));
      dispatch(setUserStories(userData.userStories));
      dispatch(messageListAction(userData.userProfileDetail.messages));
      setRenderMainPage(true);
    }
    socket.on("connect", () => {
      console.log(`connected to id: ${socket.id}`);
    });
  } catch (err) {
    history.push("/signin");
  }
};

export default getUserData;
