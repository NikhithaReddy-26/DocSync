import { Meta, StoryFn } from "@storybook/react";
import ProgressBar from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
} as Meta;

const Template: StoryFn = (args) => 
<ThemeProvider theme={theme}>
<ProgressBar {...args} />
</ThemeProvider>
;

export const Spinner = Template.bind({});
Spinner.args = {
  progressVariant: "spinner",
  spinnerProps: {
    height: "40px",
    width: "40px",
  },
};
export const Loader = Template.bind({});
Loader.args = {
  progressVariant: "loader",
};
export const NotificationLoader = Template.bind({});
NotificationLoader.args = {
  progressVariant: "notification",
  notificationProps: {
    height: "170px",
    width: "170px",
  },
};
