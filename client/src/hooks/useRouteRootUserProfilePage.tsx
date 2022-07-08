import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

type routeRootUserProfilePageParameter = {
  rootUserProfileDetail: any;
};

const useRouteRootUserProfilePage = () => {
  const dispatch = useDispatch();

  const { profilePageDataAction, setRootUserProfileDataState } =
    bindActionCreators(actionCreators, dispatch);
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );

  return (obj: routeRootUserProfilePageParameter) => {
    const userObj: ProfilePageDataState = {
      ...obj.rootUserProfileDetail,
      isRootUserFollowed: false,
      throughRouting: true,
    };
    profilePageDataAction(userObj);
    if (!rootUserProfileDataState.fetchedRootUserProfileData) {
      setRootUserProfileDataState({
        fetchedRootUserProfileData: false,
        getRootUserProfileData: true,
      });
    }
  };
};

export default useRouteRootUserProfilePage;
