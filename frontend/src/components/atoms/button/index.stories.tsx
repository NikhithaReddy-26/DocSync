import MuiButton from ".";
import type { Meta, StoryFn } from "@storybook/react";
import GoogleIcon from "./../../../../public/assets/icons/google.svg";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

const meta = {
  title: "Atoms/Button",
  component: MuiButton,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof MuiButton>;

export default meta;

const Template: StoryFn = (args) => <ThemeProvider theme={theme}><MuiButton {...args} /></ThemeProvider>;

export const LinkButton = Template.bind({});
LinkButton.args = {
  variant: "text",
  children: "text",
  sx: { color: "purple",},
  disableRipple: true,
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "contained",
  children: "primary",
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "contained",
  children: "secondary",
  color: "secondary",
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  variant: "text",
  children: "Continue with google",
  sx:{
    padding: "11px 10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    color:`${theme.palette.textColor.black}`,
    borderRadius: "4px",
    background: `${theme.palette.structural.structuralBg}`,
  },
  iconProps: {
    src: GoogleIcon,
    alt: "google-icon",
    height: "18px",
    width: "18px",
  },
};
