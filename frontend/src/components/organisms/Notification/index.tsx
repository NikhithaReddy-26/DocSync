import React from "react";
import Notification from "../../molecules/NotificationBar";
import { Badge, Stack } from "@mui/material";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import CustomDivider from "../../atoms/Divider";
import Icon from "../../atoms/Icons";
import CloseIcon from "../../../../public/assets/icons/close-icon.svg";
import NotificationIcon from "../../../../public/assets/icons/notification.svg";
import { NotificationBoxProps } from "../../../utils/interfaces";
import { NotificationBoxTitle } from "../../../utils/constants";
import "../SearchKeyword/style.css";

const NotificationBox = (props: NotificationBoxProps) => {
  const {
    read,
    notifications,
    handleCloseNotifications,
    showNotifications,
    handleShowNotifications,
  } = props;

  const NoOfMessages =
    notifications?.reduce((count, notification) => {
      return !notification.isRead ? count + 1 : count;
    }, 0) || 0;

  return (
    <Stack
      position={"relative"}
      justifyContent={"flex-end"}
      alignItems={"flex-end"}
    >
      <Stack onClick={handleShowNotifications} width={"20px"}>
        <Badge
          invisible={NoOfMessages === 0 || read}
          badgeContent={
            <MuiTypography variant="overline2" children={NoOfMessages} />
          }
        >
          {<Icon src={NotificationIcon} alt="notification" />}
        </Badge>
      </Stack>
      {showNotifications && (
        <Stack
          zIndex={"1"}
          data-testid="notificationStack"
          top={"46px"}
          right={"-15px"}
          position={"absolute"}
          width={"400px"}
          borderRadius={"4px"}
          boxSizing={"border-box"}
          sx={{
            padding: 0,
            margin: 0,
            backgroundColor: theme.palette.structural.background1,
          }}
          border={`1px solid ${theme.palette.grey[100]}`}
          boxShadow={"4px 16px 32px 0px rgba(213, 206, 221, 0.70)"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            padding={"12px"}
            alignItems="center"
          >
            <MuiTypography
              variant="h3"
              color={theme.palette.textColor.black}
              children={NotificationBoxTitle}
            />
            <Icon
              src={CloseIcon}
              alt="closeIcon"
              height="16px"
              width="16px"
              onClick={handleCloseNotifications}
            />
          </Stack>
          <Stack
            direction={"column"}
            spacing={1}
            borderTop={`1px solid ${theme.palette.grey[100]}`}
            height="51%"
            maxHeight="420px"
            overflow="auto"
            className="custom-scrollbar"

          >
            {notifications.map((notification) => (
              <Stack data-testid="notification" key={notification.id}>
                <Notification
                  avatarSrc={notification.avatar}
                  avatarAlt={`avatar${notification.id}`}
                  time={notification.time}
                  notificationMessage={
                    <span>
                      <MuiTypography
                        variant="body1"
                        color={theme.palette.textColor.black}
                        display={"inline"}
                      >
                        {notification.userName}
                      </MuiTypography>
                      {notification.message}
                    </span>
                  }
                />
                <CustomDivider />
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default NotificationBox;
