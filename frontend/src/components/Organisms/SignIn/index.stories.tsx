import React from "react";
import theme from "../../../theme";
import SignIn from ".";
import { StoryFn, Meta } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Organisms/SignIn",
  component: SignIn,
  } as Meta<typeof SignIn>;

const Template: StoryFn<typeof SignIn> = (args) => (
 <ThemeProvider theme={theme}>
    <SignIn  />
    </ThemeProvider>
);

export const SignInStory = Template.bind({});
