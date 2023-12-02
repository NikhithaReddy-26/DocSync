import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import DriveFolders from ".";
import { DRIVE_FILES } from "../../../utils/constants";

export default {
  title: "Organisms/GoogleDriveFolders",
  component: DriveFolders,
} as Meta<typeof DriveFolders>;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <DriveFolders driveFiles={DRIVE_FILES} {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
