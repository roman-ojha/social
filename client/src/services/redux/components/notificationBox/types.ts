export interface NotificationBoxState {
  notificationData: [];
  open: boolean;
}

export enum NotificationBoxActionTypes {
  OPEN_NOTIFICATION_BOX = "openNotificationBox",
  SET_NOTIFICATION_DATA = "setNotificationData",
}
export interface OpenNotificationBox {
  type: NotificationBoxActionTypes.OPEN_NOTIFICATION_BOX;
  payload: any;
}

export interface SetNotificationData {
  type: NotificationBoxActionTypes.SET_NOTIFICATION_DATA;
  payload: any;
}

export type NotificationBoxAction = OpenNotificationBox | SetNotificationData;
