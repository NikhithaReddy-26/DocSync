import React from "react";
import ProfileInfo from ".";
import theme from "../../../theme";
import { StoryFn, Meta } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Organisms/ProfileInfo",
  component: ProfileInfo,
  argTypes: {
    handleLogout: {
      action: "clicked",
    },
  },
} as Meta<typeof ProfileInfo>;

const Template: StoryFn<typeof ProfileInfo> = (args) => (
 <ThemeProvider theme={theme}>
    <ProfileInfo {...args} />
    </ThemeProvider>
);

export const ProfileInfoStory = Template.bind({});

ProfileInfoStory.args = {
  userId: "IDJR00292",
  username: "John Ross",
};
