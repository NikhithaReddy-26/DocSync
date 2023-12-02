import theme from "../../../theme";
import ResetPasswordSuccess from ".";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Molecules/ResetPasswordSuccess",
  component: ResetPasswordSuccess,
  argTypes: {
    handleClick: {
      action: "clicked",
    },
  },
} as Meta<typeof ResetPasswordSuccess>;

const Template: StoryFn<typeof ResetPasswordSuccess> = (args) => (
  <ThemeProvider theme={theme}>
    <ResetPasswordSuccess {...args} />
  </ThemeProvider>
);

export const ResetPasswordSuccessStory = Template.bind({});
