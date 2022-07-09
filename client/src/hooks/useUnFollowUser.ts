import { actionCreators } from "../services/redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { instance as axios } from "../services/axios";
import { AxiosError } from "axios";
import { toastSuccess, toastError } from "../services/toast";

type ReturnArgument = {
  userInformation: {
    type: string;
    userID: string;
    id: string;
  };
  from: "userSuggestionComp" | "followedByComp" | "profilePage";
  optional?: {
    for: "profilePage";
    data: any;
  };
};

const useUnFollowUser = () => {
  const dispatch = useDispatch();
  const {
    startProgressBar,
    stopProgressBar,
    isFollowedSuggestedUser,
    isFollowedFollowedByUser,
    profilePageDataAction,
  } = bindActionCreators(actionCreators, dispatch);

  return async (obj: ReturnArgument): Promise<void> => {
    if (obj.userInformation.type !== "bot") {
      try {
        startProgressBar();
        const unFollowedTo = {
          userID: obj.userInformation.userID,
          id: obj.userInformation.id,
        };
        const response = await axios({
          method: "POST",
          url: "/u/unfollow",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(unFollowedTo),
          // sending both follwedTo and FollowedBy
          withCredentials: true,
        });
        const data = await response.data;
        if (response.status === 200 && data.success) {
          toastSuccess(data.msg);
          if (obj.from === "userSuggestionComp") {
            isFollowedSuggestedUser({
              userID: obj.userInformation.userID,
              followed: false,
              type: "",
            });
          }
          if (obj.from === "followedByComp") {
            isFollowedFollowedByUser({
              userID: obj.userInformation.userID,
              followed: false,
              type: "",
            });
          }
          if (
            obj.from === "profilePage" &&
            obj.optional?.for === "profilePage"
          ) {
            const userObj = {
              ...obj.optional.data,
              isRootUserFollowed: false,
            };
            profilePageDataAction(userObj);
          }
          stopProgressBar();
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        stopProgressBar();
      }
    } else {
      toastError("Sorry!!, can't be able to Follow bot");
    }
  };
};

export default useUnFollowUser;
