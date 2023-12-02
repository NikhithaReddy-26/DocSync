import { Meta, StoryFn } from "@storybook/react";
import { CustomRadio } from ".";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Atoms/CustomRadio",
  component: CustomRadio,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium"],
      },
    },
    onChange: { action: "onChange" },
  },
} as Meta<typeof CustomRadio>;

const Template: StoryFn<typeof CustomRadio> = (args) => (
  <ThemeProvider theme={theme}>
    {" "}
    <CustomRadio {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
