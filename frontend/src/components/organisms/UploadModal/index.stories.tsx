import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { UploadModal } from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Organisms/UploadModal",
  component: UploadModal,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <UploadModal {...args} />
  </ThemeProvider>
);
export const Default = Template.bind({});
Default.args = {};
