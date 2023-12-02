import api from "../api";
import {
  NotificationDto,
  Notification,
  UserDto,
  FileDto,
} from "../../utils/interfaces";
import { getAllUsers, getUsersByIds } from "../auth";
import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ACTION_UPLOAD,
  HAS_DELETED,
  HAS_UPDATED,
  HAS_UPLOADED,
  HAVE_DELETED,
  HAVE_UPDATED,
  HAVE_UPLOADED,
} from "../../utils/constants";
import { getFilesByIds } from "../files/api";
import Avatar from "../../../public/assets/icons/avatar.svg";

/*
 *  Get notifications api call for user by userId
 */
const getNotificationsByUserId = async (
  userId?: string,
  authToken?: string
): Promise<NotificationDto[]> => {
  api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  try {
    const notification = await api.get(`/notifications/${userId}`);
    return notification.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
  return [];
};

/*
 *   Format date and time to format dd MMMM hh:mm am\pm
 */
export function formatDateAndTime(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  return `${day} ${month} ${hours}:${minutes} ${ampm}`;
}

/*
 *   create individual notification to be displayed in notification box
 */
const createNotificationToDisplay = (
  createdByUser: UserDto,
  notification: NotificationDto,
  file: FileDto,
  userId?: string
): Notification => {
  let message = "";
  let fileName=file.fileName;
  if(fileName.length>20){
    fileName=fileName.slice(0,12)+'...'+fileName.slice(-4);
  }
  switch (notification.action) {
    case ACTION_UPLOAD:
      message = ` ${
        userId === createdByUser.id ? HAVE_UPLOADED : HAS_UPLOADED
      } ${fileName}`;
      break;
    case ACTION_UPDATE:
      message = ` ${userId === createdByUser.id ? HAVE_UPDATED : HAS_UPDATED} ${
        fileName
      }`;
      break;
    case ACTION_DELETE:
      message = ` ${userId === createdByUser.id ? HAVE_DELETED : HAS_DELETED} ${
        fileName
      }`;
      break;
    default:
    // DO NOTHING
  }

  return {
    id: notification.notificationId,
    userName: userId === createdByUser.id ? "You" : createdByUser.firstName,
    message: message,
    avatar: Avatar,
    time: formatDateAndTime(new Date(notification.createdOn)),
    isRead: notification.read,
  };
};

/*
 *   Get notifications
 */
export const getNotifications = async (
  userId?: string,
  authToken?: string
): Promise<Notification[]> => {
  try {
    const notifications = await getNotificationsByUserId(userId, authToken);
    if (notifications.length === 0) return [];

    let userIds: string[] = [];
    let fileIds: string[] = [];
    notifications.forEach((notification) => {
      notification.createdBy && userIds.push(notification.createdBy);
      notification.fileId && fileIds.push(notification.fileId);
    });

    const users = await getUsersByIds(userIds);
    const files = await getFilesByIds(fileIds, authToken);

    let notificationsToShow: Notification[] = [];
    notifications.forEach((notification) => {
      const user = users.find(
        (user: UserDto) => user.id === notification.createdBy
      );
      const file = files.find(
        (file: FileDto) => file.fileId == notification.fileId
      );
      if (user && file) {
        notificationsToShow.push(
          createNotificationToDisplay(user, notification, file, userId)
        );
      }
    });
    return notificationsToShow;
  } catch (err) {
    console.log(err);
  }
  return [];
};

/*
 *   Patch "isRead" true for read notifications
 */
export const markNotificationRead = async (
  notificationIds: string[],
  authToken?: string
) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  try {
    const patchNotificationCall: any[] = [];
    notificationIds.forEach((notificationId) => {
      patchNotificationCall.push(
        api.patch(`/notifications/${notificationId}`, {
          read: true,
        })
      );
    });
    await Promise.all(patchNotificationCall);
  } catch (error) {
    console.error("Error patching notifications:", error);
    throw new Error("Failed to patch notifications. Please try again.");
  }
};

/*
 *   Post new notification
 */
export const postNotifications = async (
  createdByUserId: string | undefined,
  fileId: string | undefined,
  action: "Uploaded" | "Updated" | "Deleted",
  authToken?: string
) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    const users = await getAllUsers();
    const notifications: NotificationDto[] = [];
    users.forEach((user: UserDto) => {
      notifications.push({
        fileId: fileId,
        action: action,
        createdBy: createdByUserId,
        read: false,
        createdOn: new Date(),
        usrId: user.id,
      });
    });
    const updatedNotifications: NotificationDto[] = [];
    const response = await api.post("/notifications", {
      notifications: notifications,
    });

    return response.data.notifications;
  } catch (error) {
    console.error("Error post notifications:", error);
    throw new Error("Failed to post notifications. Please try again.");
  }
};
