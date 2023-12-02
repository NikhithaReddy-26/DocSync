import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { UpdateModalProps, UploadLoader } from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Organisms/UploadLoader",
  component: UploadLoader,
} as Meta;

const Template: StoryFn<UpdateModalProps> = (args) => (
  <ThemeProvider theme={theme}>
    <UploadLoader {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  pdfName: "example.pdf",
};
