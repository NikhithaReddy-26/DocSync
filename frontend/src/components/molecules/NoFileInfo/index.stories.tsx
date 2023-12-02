import React from "react";
import NoFileInfo from ".";
import theme from "../../../theme";
import { StoryFn, Meta } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Molecules/NoFileInfo",
  component: NoFileInfo,
} as Meta<typeof NoFileInfo>;

const Template: StoryFn<typeof NoFileInfo> = (args) => (
  <ThemeProvider theme={theme}>
    <NoFileInfo />
  </ThemeProvider>
);

export const NoFileInfoStory = Template.bind({});
