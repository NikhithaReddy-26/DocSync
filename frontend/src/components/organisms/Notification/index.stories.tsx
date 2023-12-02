import { Meta, StoryFn } from "@storybook/react";
import NotificationBox from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { Notifications } from "../../../utils/constants";
import { useNotification } from "../Header/hook";

export default {
  title: "Organisms/NotificationBox",
  component: NotificationBox,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta<typeof NotificationBox>;

const NotificationBoxContainer: React.FC = () => {
  const {
    read,
    handleCloseNotifications,
    handleShowNotifications,
    showNotifications,
  } = useNotification();

  return (
    <NotificationBox
      notifications={Notifications}
      showNotifications={showNotifications}
      read={read}
      handleShowNotifications={handleShowNotifications}
      handleCloseNotifications={handleCloseNotifications}
    />
  );
};

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <NotificationBoxContainer />
  </ThemeProvider>
);

export const DefaultNotificationBox = Template.bind({});
DefaultNotificationBox.args = {
  notifications: Notifications,
};
