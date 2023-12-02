import { Meta, StoryFn } from "@storybook/react";
import Notification from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import avatar from "../../../../public/assets/icons/avatar.svg";
import MuiTypography from "../../atoms/Typography";

export default {
  title: "Molecules/NotificationBar",
  component: Notification,
} as Meta<typeof Notification>;

const Template: StoryFn<typeof Notification> = (args) => (
  <ThemeProvider theme={theme}>
    <Notification {...args} />
  </ThemeProvider>
);

export const DefaultNotification = Template.bind({});
DefaultNotification.args = {
  notificationMessage: (
    <span>
      <MuiTypography
        variant="body1"
        color={theme.palette.textColor.black}
        display={"inline"}
      >
        {"User"}
      </MuiTypography>
      {" has uploaded"}
    </span>
  ),
  time: "20 June 10 30 AM",
  avatarSrc: avatar,
};
