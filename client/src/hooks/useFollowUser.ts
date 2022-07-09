import { actionCreators, AppState } from "../services/redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { instance as axios } from "../services/axios";
import { AxiosError } from "axios";
import { toastSuccess, toastError } from "../services/toast";

type ReturnArgument = {
  userInformation: any;
  from: "userSuggestionComp" | "followedByComp";
};

const useFollowUser = () => {
  const dispatch = useDispatch();
  const {
    startProgressBar,
    stopProgressBar,
    isFollowedSuggestedUser,
    isFollowedFollowedByUser,
  } = bindActionCreators(actionCreators, dispatch);

  return async (obj: ReturnArgument): Promise<void> => {
    if (obj.userInformation.type !== "bot") {
      try {
        startProgressBar();
        const followedTo = {
          userID: obj.userInformation.userID,
          id: obj.userInformation.id,
        };
        const response = await axios({
          method: "POST",
          url: "/u/follow",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(followedTo),
          // sending both follwedTo and FollowedBy
          withCredentials: true,
        });
        const data = await response.data;
        if (response.status === 200 && data.success) {
          toastSuccess(data.msg);
          if (obj.from === "userSuggestionComp") {
            isFollowedSuggestedUser({
              userID: obj.userInformation.userID,
              followed: true,
              type: "",
            });
          }
          if (obj.from === "followedByComp") {
            isFollowedFollowedByUser({
              userID: obj.userInformation.userID,
              followed: true,
              type: "",
            });
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

export default useFollowUser;
