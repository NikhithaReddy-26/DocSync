import React from "react";
import theme from "../../../theme";
import ResetPassword from ".";
import { StoryFn, Meta } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Organisms/ResetPassword",
  component: ResetPassword,
  } as Meta<typeof ResetPassword>;

const Template: StoryFn<typeof ResetPassword> = (args) => (
 <ThemeProvider theme={theme}>
    <ResetPassword  />
    </ThemeProvider>
);

export const ResetPasswordStory = Template.bind({});
