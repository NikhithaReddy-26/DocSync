import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CustomDropdown, { SelectLabelsProps } from "."; 
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Molecules/CustomDropdown",
  component: CustomDropdown,
} as Meta;

const Template: StoryFn<SelectLabelsProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CustomDropdown {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  menuItems: {
    option1: "PDF",
    option2: "PPT",
    option3: "Image",
  },
  placeholder: "File type",
  label: "File type",
  value: "",
  onChange: (value) => {},
};
export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
  menuItems: {
    option1: "PDF",
    option2: "PPT",
    option3: "Image",
  },
  placeholder: "File type",
  label: "File type",
  value: "option2",
  onChange: (value) => {},
};
