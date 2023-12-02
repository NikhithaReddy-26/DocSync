import React from "react";
import theme from "../../../theme";
import IconTypo from ".";
import fileLogo from "../../../../public/assets/icons/file-drive.svg";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Molecules/IconTypo",
  component: IconTypo,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta<typeof IconTypo>;

const Template: StoryFn<typeof IconTypo> = (args) => (
  <ThemeProvider theme={theme}>
    <IconTypo {...args} />
  </ThemeProvider>
);

export const PrimaryIconTypo = Template.bind({});
PrimaryIconTypo.args = {
  iconProps: {
    src: fileLogo,
    width: "50px",
    height: "50px",
  },
  text: "Company Overview",
  showCheckBox: false,
};
export const CheckboxIconTypo = Template.bind({});
CheckboxIconTypo.args = {
  iconProps: {
    src: fileLogo,
    width: "50px",
    height: "50px",
  },
  text: "Company Overview",
  showCheckBox: true,
};
