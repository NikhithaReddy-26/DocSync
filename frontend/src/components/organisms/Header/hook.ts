import { useEffect, useState } from "react";
import { Notification } from "../../../utils/interfaces";
import {
  getNotifications,
  markNotificationRead,
} from "../../../services/notifications";

export const useHeader = () => {
  const [showProfileInfo, setShowProfileInfo] = useState<boolean>(false);

  const onAvatarClickHandler = () => {
    setShowProfileInfo((current) => !current);
  };

  const onAvatarBlur = () => {
    setShowProfileInfo(false);
  };

  return { showProfileInfo, onAvatarClickHandler, onAvatarBlur };
};

export const useNotification = (userId?: string, authToken?: string) => {
  const [read, setRead] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const notification = await getNotifications(userId, authToken);
    notification && setNotifications(notification);
  };

  useEffect(() => {
    const notificationIds = notifications
      .filter((notification) => !notification.isRead)
      .map((notification) => notification.id)
      .filter((id) => id !== undefined)
      .map((id) => id as string);
    notificationIds.length !== 0 &&
      markNotificationRead(notificationIds, authToken);
  }, [read]);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
    setRead(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return {
    read,
    showNotifications,
    notifications,
    fetchNotifications,
    handleShowNotifications,
    handleCloseNotifications,
  };
};
