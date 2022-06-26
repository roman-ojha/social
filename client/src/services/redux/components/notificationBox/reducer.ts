import {
  NotificationBoxState,
  NotificationBoxAction,
  NotificationBoxActionTypes,
} from "./types";

const initialState: NotificationBoxState = {
  notificationData: [],
  open: false,
};

const notificationBox = (
  state: NotificationBoxState = initialState,
  action: NotificationBoxAction
): NotificationBoxState => {
  switch (action.type) {
    case NotificationBoxActionTypes.OPEN_NOTIFICATION_BOX:
      return {
        ...state,
        open: action.payload,
      };
    case NotificationBoxActionTypes.SET_NOTIFICATION_DATA:
      return {
        ...state,
        notificationData: action.payload,
      };
    default:
      return state;
  }
};

export default notificationBox;
