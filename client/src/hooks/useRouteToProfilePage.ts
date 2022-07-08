import GlobalApi from "../services/api/global";
import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";
import { bindActionCreators } from "redux";
import { actionCreators } from "../services/redux";
import { useDispatch } from "react-redux";
import { toastError } from "../services/toast";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import constant from "../constant/constant";
import { AxiosError } from "axios";

const useRouteToProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  const {
    profilePageDataAction,
    startProgressBar,
    stopProgressBar,
    openRightPartDrawer,
  } = bindActionCreators(actionCreators, dispatch);

  return async (userID: string): Promise<void> => {
    try {
      startProgressBar();
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj: ProfilePageDataState = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
          throughRouting: true,
        };
        profilePageDataAction(userObj);
        if (isMax850px) {
          openRightPartDrawer(false);
        }
        history.push(`/u/profile/${userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      stopProgressBar();
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
  };
};

export default useRouteToProfilePage;
